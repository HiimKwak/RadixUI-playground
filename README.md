# Styling a Radix Dialog with Tailwind CSS

YouTube 강의 따라하기 → [https://www.youtube.com/watch?v=KvZoBV_1yYE](https://www.youtube.com/watch?v=KvZoBV_1yYE)

## Radix의 좋은 점

1. Incremental adoption
   모듈을 각각 adopt해와 번들 사이즈를 줄일 수 있다.

2. Unstyled
   스타일은 없지만 Tag name으로 구분이 이미 돼있기 때문에 가독성이 매우 좋다

3. 키보드 상호작용 지원
   별도의 세팅 없이도 WAI-ARIA 패턴에 맞게 키보드액션이 다 매핑돼있다.

4. 각 모듈마다 필요한 구성요소들이 준비돼있다
   각 모듈마다 필요한 구성요소들이 이미 갖춰져있다. 모달의 경우 트리거(버튼), 포탈(모달) - 오버레이(검은화면), 컨텐트로 구성돼있고 심지어 오버레이를 갖다 쓰면 스크롤도 자동으로 막아준다!

5. Uncontrolled
   Radix Component들은 이미 그 내장 기능을 통해 개발자가 control하지 않아도 되는 상태이다(uncontrolled). 하지만 local state를 생성해 얼마든지 개발자가 control할 수 있는 자유도가 있다(개편함)

## 새로운 Tailwind 팁

1. 모달 가운데 놓는 간단한 계산

   1. 모달 태그를 스크린의 중앙에 먼저 놓으면 왼쪽 모서리 끝이 중앙에 가게 됨
   2. 그 상태에서 모달의 크기에서 절반만큼 negative 방향으로 옮겨주면
      정중앙에 위치하게 된다.

```jsx
className = "fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2";
```

2. `group` property

   만약 `form`에서 submit 버튼을 눌렀을 때 saving state에 따라 UI 상태를 동기화하고 싶다면, 일괄적으로 관리할 수 있는 방법이 있다. 이 방법을 사용하면 `disabled`과 관련된 최상위 주체에만 `disabled` 프로퍼티를 사용하고 그 아래에선 간편하게 `group-disabled/enabled` 조건을 통해 스타일링할 수 있다는 장점이 있다.

   1. `form` 태그 내용물을 `fieldset`으로 감싸고, `disabled` property는 local state로, `className`은 `group`을 지정해준다.
   2. 변화를 원하는 태그에서 `group-disabled` 혹은 `group-enabled` 조건을 써준 뒤 스타일링한다.

```jsx
<form onSubmit={handleSubmit}>
  <fieldset disabled={saving} className="group">
    <div className="mt-8 group-disabled:opacity-50">
      <ContactFields contact={contact} />
    </div>
    <div className="mt-8 space-x-6 text-right">
      <Dialog.Close className="px-4 py-2 text-sm font-medium text-gray-500 rounded hover:text-gray-600">
        Cancel
      </Dialog.Close>
      <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600 group-disabled:pointer-events-none">
        <Spinner className="absolute h-4 group-enabled:opacity-0" />
        <span className="group-disabled:opacity-0">Save</span>
      </button>
    </div>
  </fieldset>
</form>
```

3. animation tips

   적절한 animation만 적용해도 앱의 퀄리티가 깔@쌈해진다.

   1. global.css 혹은 import/export로 연결돼있는 css 파일에 `@keyframes`로 animation을 정의하자.
   2. css의 적용 범위 내 파일에서 `animate-[{keyframe 이름}_{지속시간}]`으로 적용하면 끝.
   3. 추가로 Radix가 자동으로 modal의 open 여부를 'data-state:open/closed' 프로퍼티를 부여해 관리하고 있으므로 `data-[state:open/closed]:` 전치조건을 기입해 애니메이션을 100% 컨트롤할 수 있다!

```jsx
<Dialog.Overlay className="data-[state=open]:animate-[dialog-overlay-show_200ms] data-[state=closed]:animate-[dialog-overlay-hide_200ms] fixed inset-0 bg-black/50" />
```

## VS Code 팁

1. 같은 키워드 한번에 수정하기 -> F2(cmd + d 해도 됨)

2. 코드 블럭 지정해서 하나의 태그로 감싸기 -> cmd + shift + c(shortcut 등록 필요)

3. 코드 블럭 접고 펼치기 단축키 -> cmd + opt + [ or ]
