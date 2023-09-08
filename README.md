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

## 새로운 Tailwind 팁

1. 모달 가운데 놓는 간단한 계산
   모달 태그를 스크린의 중앙에 먼저 놓으면 왼쪽 모서리 끝이 중앙에 가게 됨,
   그 상태에서 모달의 크기에서 절반만큼 negative 방향으로 옮겨주면
   정중앙에 위치하게 된다.

```
className="fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
```
