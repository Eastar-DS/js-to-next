# Phase 3.9: Optimistic Updates 개념 학습

> **주의**: 이 Phase는 읽기 전용 학습 자료입니다. 실제 구현하지 않고 개념만 학습합니다.

## 목차
1. [Optimistic Updates란?](#optimistic-updates란)
2. [왜 사용하는가?](#왜-사용하는가)
3. [React Query에서의 구현 방법](#react-query에서의-구현-방법)
4. [실제 코드 예제](#실제-코드-예제)
5. [장단점](#장단점)
6. [실제 사용 사례](#실제-사용-사례)

---

## Optimistic Updates란?

**Optimistic Update**는 서버 응답을 기다리지 않고, 사용자의 액션이 성공할 것이라고 "낙관적으로 가정"하여 UI를 먼저 업데이트하는 패턴입니다.

### 일반적인 업데이트 흐름 (Pessimistic)
```
1. 사용자 액션 (예: 좋아요 클릭)
2. 서버에 요청 전송
3. 로딩 상태 표시 (스피너 등)
4. 서버 응답 대기... ⏳
5. 응답 성공 시 UI 업데이트
```

**문제점**: 사용자는 응답을 기다려야 하므로 느리게 느껴집니다.

### Optimistic Update 흐름
```
1. 사용자 액션 (예: 좋아요 클릭)
2. 즉시 UI 업데이트 (좋아요 수 +1) ⚡
3. 백그라운드에서 서버에 요청 전송
4. 성공: 그대로 유지
5. 실패: 원래 상태로 롤백
```

**장점**: 사용자는 즉각적인 피드백을 받아 앱이 빠르다고 느낍니다.

---

## 왜 사용하는가?

### 1. **사용자 경험 개선**
- 즉각적인 피드백으로 반응성이 뛰어난 UI
- 네트워크 지연을 사용자가 느끼지 못함

### 2. **체감 성능 향상**
- 실제 응답 시간: 500ms
- 체감 응답 시간: 0ms (즉시 UI 변경)

### 3. **실제 사용 사례**
- **SNS 좋아요**: 클릭 즉시 하트 색상 변경
- **댓글 작성**: 작성 즉시 화면에 표시
- **할 일 체크**: 체크 즉시 줄 그어짐
- **장바구니 추가**: 추가 즉시 개수 증가

---

## React Query에서의 구현 방법

React Query는 `useMutation` 훅과 함께 Optimistic Updates를 위한 강력한 API를 제공합니다.

### 핵심 개념

```typescript
const mutation = useMutation({
  mutationFn: updateServerData,  // 실제 서버 업데이트 함수

  // 1. onMutate: 뮤테이션 실행 직전 (낙관적 업데이트)
  onMutate: async (newData) => {
    // 이전 데이터 저장 (롤백용)
    const previousData = queryClient.getQueryData(queryKey);

    // 즉시 UI 업데이트
    queryClient.setQueryData(queryKey, newData);

    // 롤백에 필요한 데이터 반환
    return { previousData };
  },

  // 2. onError: 실패 시 롤백
  onError: (err, newData, context) => {
    // 이전 데이터로 복원
    queryClient.setQueryData(queryKey, context.previousData);
  },

  // 3. onSettled: 성공/실패 상관없이 실행
  onSettled: () => {
    // 서버 데이터와 동기화
    queryClient.invalidateQueries({ queryKey });
  },
});
```

### 3단계 프로세스

1. **onMutate**: 낙관적 업데이트 + 이전 상태 저장
2. **onError**: 실패 시 이전 상태로 롤백
3. **onSettled**: 서버와 재동기화

---

## 실제 코드 예제

### 예제 1: 좋아요 기능

```typescript
// 좋아요 Mutation 훅
const useLikeMutation = (imageId: number) => {
  const queryClient = useQueryClient();
  const queryKey = ['image', imageId];

  return useMutation({
    mutationFn: async (liked: boolean) => {
      // 서버에 좋아요 상태 전송
      const response = await fetch(`/api/images/${imageId}/like`, {
        method: 'POST',
        body: JSON.stringify({ liked }),
      });
      return response.json();
    },

    // 1. 낙관적 업데이트
    onMutate: async (newLiked: boolean) => {
      // 진행 중인 쿼리 취소 (충돌 방지)
      await queryClient.cancelQueries({ queryKey });

      // 이전 데이터 백업
      const previousImage = queryClient.getQueryData<Image>(queryKey);

      // 즉시 UI 업데이트 (좋아요 수 증가/감소)
      queryClient.setQueryData<Image>(queryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          likes: newLiked ? old.likes + 1 : old.likes - 1,
          isLiked: newLiked,
        };
      });

      // 롤백용 데이터 반환
      return { previousImage };
    },

    // 2. 에러 시 롤백
    onError: (err, newLiked, context) => {
      // 이전 상태로 복원
      queryClient.setQueryData(queryKey, context?.previousImage);

      // 사용자에게 에러 알림
      toast.error('좋아요 처리 실패. 다시 시도해주세요.');
    },

    // 3. 완료 후 서버 데이터와 동기화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

// 컴포넌트에서 사용
const ImageCard = ({ image }: { image: Image }) => {
  const likeMutation = useLikeMutation(image.id);

  const handleLike = () => {
    // 즉시 UI 업데이트됨!
    likeMutation.mutate(!image.isLiked);
  };

  return (
    <div>
      <img src={image.url} alt={image.tags} />
      <button onClick={handleLike}>
        {image.isLiked ? '❤️' : '🤍'} {image.likes}
      </button>
    </div>
  );
};
```

### 실행 흐름 예시

```
사용자가 좋아요 클릭 (현재 likes: 100)
↓
onMutate 실행:
  - previousImage 저장: { likes: 100, isLiked: false }
  - UI 즉시 업데이트: { likes: 101, isLiked: true } ⚡
  - 사용자는 즉시 하트가 빨갛게 변하는 것을 봄!
↓
서버에 요청 전송...
↓
케이스 1: 성공 ✅
  - onSettled 실행
  - 서버에서 최신 데이터 가져와서 동기화
  - 결과: likes: 101 유지
↓
케이스 2: 실패 ❌ (네트워크 오류, 서버 오류 등)
  - onError 실행
  - 이전 데이터로 롤백: { likes: 100, isLiked: false }
  - 사용자에게 에러 토스트 표시
```

---

### 예제 2: 할 일 체크 기능

```typescript
// 할 일 체크 Mutation
const useToggleTodoMutation = () => {
  const queryClient = useQueryClient();
  const queryKey = ['todos'];

  return useMutation({
    mutationFn: async ({ id, completed }: { id: number; completed: boolean }) => {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ completed }),
      });
      return response.json();
    },

    onMutate: async ({ id, completed }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousTodos = queryClient.getQueryData<Todo[]>(queryKey);

      // 할 일 목록에서 해당 항목만 업데이트
      queryClient.setQueryData<Todo[]>(queryKey, (old) => {
        if (!old) return old;
        return old.map((todo) =>
          todo.id === id ? { ...todo, completed } : todo
        );
      });

      return { previousTodos };
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousTodos);
      toast.error('체크 처리 실패');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

// 컴포넌트
const TodoItem = ({ todo }: { todo: Todo }) => {
  const toggleMutation = useToggleTodoMutation();

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => {
          // 체크박스가 즉시 변경됨!
          toggleMutation.mutate({
            id: todo.id,
            completed: e.target.checked,
          });
        }}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
    </div>
  );
};
```

---

### 예제 3: 댓글 추가 (더 복잡한 예제)

```typescript
// 댓글 추가 Mutation
const useAddCommentMutation = (postId: number) => {
  const queryClient = useQueryClient();
  const queryKey = ['comments', postId];

  return useMutation({
    mutationFn: async (newComment: { text: string; author: string }) => {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify(newComment),
      });
      return response.json();
    },

    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey });

      const previousComments = queryClient.getQueryData<Comment[]>(queryKey);

      // 임시 ID로 즉시 댓글 추가 (서버에서 실제 ID를 받기 전)
      const optimisticComment: Comment = {
        id: Date.now(), // 임시 ID
        text: newComment.text,
        author: newComment.author,
        createdAt: new Date().toISOString(),
        isPending: true, // 아직 서버 확인 전
      };

      queryClient.setQueryData<Comment[]>(queryKey, (old) => {
        if (!old) return [optimisticComment];
        return [...old, optimisticComment];
      });

      return { previousComments, optimisticComment };
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousComments);
      toast.error('댓글 작성 실패');
    },

    onSuccess: (serverComment, variables, context) => {
      // 서버에서 받은 실제 댓글로 교체
      queryClient.setQueryData<Comment[]>(queryKey, (old) => {
        if (!old) return [serverComment];
        return old.map((comment) =>
          comment.id === context.optimisticComment.id
            ? serverComment  // 임시 댓글을 실제 댓글로 교체
            : comment
        );
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

// 컴포넌트
const CommentForm = ({ postId }: { postId: number }) => {
  const [text, setText] = useState('');
  const addCommentMutation = useAddCommentMutation(postId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 댓글이 즉시 화면에 표시됨!
    addCommentMutation.mutate({
      text,
      author: 'Current User',
    });

    setText(''); // 입력창 비우기
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="댓글을 입력하세요"
      />
      <button type="submit">작성</button>
    </form>
  );
};

const CommentItem = ({ comment }: { comment: Comment }) => (
  <div style={{ opacity: comment.isPending ? 0.5 : 1 }}>
    <strong>{comment.author}</strong>
    <p>{comment.text}</p>
    {comment.isPending && <span>전송 중...</span>}
  </div>
);
```

---

## 장단점

### 장점 ✅

1. **즉각적인 사용자 피드백**
   - 네트워크 지연 없이 즉시 UI 반응
   - 앱이 빠르다고 느껴짐

2. **오프라인 우선 UX**
   - 네트워크가 느려도 사용자는 계속 작업 가능
   - 백그라운드에서 동기화

3. **사용자 이탈 감소**
   - 로딩 시간이 길어질수록 이탈률 증가
   - Optimistic Update로 이탈률 감소

4. **React Query가 복잡한 로직 처리**
   - 롤백, 재시도, 동기화를 자동으로 처리
   - 개발자는 비즈니스 로직에 집중

### 단점 ❌

1. **복잡성 증가**
   - 에러 처리, 롤백 로직이 추가됨
   - 디버깅이 어려울 수 있음

2. **일관성 문제 가능성**
   - 낙관적 업데이트와 실제 서버 상태가 다를 수 있음
   - 여러 사용자가 동시에 수정하는 경우 충돌 가능

3. **모든 API에 적합하지 않음**
   - 결제, 계좌 이체 등 중요한 작업에는 부적합
   - 실패 시 롤백이 혼란을 줄 수 있는 경우

4. **서버 검증 필요**
   - 낙관적 업데이트는 UI만 변경
   - 서버에서 실패하면 롤백 필요

---

## 실제 사용 사례

### 적합한 경우 ✅

- **SNS 좋아요/팔로우**: 실패해도 큰 문제 없음
- **할 일 체크/삭제**: 즉각적인 피드백이 중요
- **댓글/메시지 작성**: 작성 즉시 보이는 게 자연스러움
- **북마크/즐겨찾기**: 실패 시 롤백해도 문제 없음
- **간단한 설정 변경**: 테마, 알림 설정 등

### 부적합한 경우 ❌

- **결제/송금**: 실패 시 큰 문제 발생
- **중요한 데이터 삭제**: 실수로 삭제했을 때 롤백이 혼란스러움
- **재고 차감**: 실제 재고와 불일치 가능
- **예약/구매**: 실패 시 사용자에게 큰 실망
- **보안 관련 작업**: 2FA, 비밀번호 변경 등

---

## Prefetch vs Optimistic Updates 비교

우리가 Phase 3.8에서 학습한 **Prefetch**와 **Optimistic Updates**를 비교해봅시다.

| 구분 | Prefetch | Optimistic Updates |
|------|----------|-------------------|
| **목적** | 데이터를 미리 로드 | UI를 먼저 업데이트 |
| **타이밍** | 사용자 액션 전 | 사용자 액션 후 |
| **사용 시점** | 읽기 작업 (GET) | 쓰기 작업 (POST/PUT/DELETE) |
| **API** | `queryClient.prefetchQuery()` | `useMutation()` + `onMutate` |
| **롤백** | 필요 없음 | 실패 시 롤백 필요 |
| **예제** | 다음 페이지 미리 로드 | 좋아요 즉시 반영 |

### 함께 사용하는 예제

```typescript
// Prefetch: 이미지 목록 미리 로드
const prefetchImages = (page: number) => {
  queryClient.prefetchQuery({
    queryKey: ['images', page],
    queryFn: () => fetchImages(page),
  });
};

// Optimistic Update: 좋아요 즉시 반영
const likeMutation = useMutation({
  mutationFn: likeImage,
  onMutate: async (imageId) => {
    // 즉시 UI 업데이트
    const previousImages = queryClient.getQueryData(['images', currentPage]);
    queryClient.setQueryData(['images', currentPage], (old) => {
      return old.map((img) =>
        img.id === imageId ? { ...img, likes: img.likes + 1 } : img
      );
    });
    return { previousImages };
  },
  // ... onError, onSettled
});
```

---

## 핵심 개념 정리

### 1. **onMutate**: 낙관적 업데이트
- 서버 요청 전 즉시 실행
- UI를 먼저 업데이트
- 롤백용 이전 데이터 반환

### 2. **onError**: 롤백
- 서버 요청 실패 시 실행
- `onMutate`에서 반환한 이전 데이터로 복원

### 3. **onSettled**: 동기화
- 성공/실패 상관없이 실행
- `invalidateQueries`로 서버와 동기화

### 4. **cancelQueries**: 충돌 방지
- 진행 중인 쿼리를 취소하여 충돌 방지
- `onMutate`에서 가장 먼저 실행

---

## 참고 자료

- [React Query 공식 문서 - Optimistic Updates](https://tanstack.com/query/latest/docs/react/guides/optimistic-updates)
- [TanStack Query - Mutations](https://tanstack.com/query/latest/docs/react/guides/mutations)
- [React Query - onMutate](https://tanstack.com/query/latest/docs/react/reference/useMutation#onmutate)

---

## 마무리

**Optimistic Updates**는 사용자 경험을 극대적으로 개선하는 강력한 패턴입니다.

- **Prefetch (Phase 3.8)**: 데이터를 미리 가져와서 로딩 시간 제거
- **Optimistic Updates (Phase 3.9)**: UI를 먼저 업데이트하여 반응성 향상

두 기법을 함께 사용하면 **빠르고 반응성이 뛰어난 애플리케이션**을 만들 수 있습니다!

React Query는 이 복잡한 로직을 간단한 API로 제공하여, 개발자가 비즈니스 로직에 집중할 수 있게 합니다.

---

**읽기 전용 학습 완료!**
이제 Optimistic Updates 개념을 이해했다면, 실제 프로젝트에서 필요할 때 적용해보세요! 🚀
