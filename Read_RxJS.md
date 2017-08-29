# RxJS

## 목차
- Functional Programming
- Observer Pattern
- Iterable Pattern
- FRP의 의미
- RxJS란

## Observer Pattern

- 정의 : 이 패턴의 주요 목적은 결합도를 낮추는 것이다. 어떤 객체가 다른 객체의 메서드를 호출하는 대신, 객체의 특별한 행동을 구독(subscribe)해 알림(notify)을 받는다.
이 패턴에서 사용되는 요소 중 옵저버 패턴에 의해 감시받고 있는 대상을 `Subject`라고 부르며 감시하는 요소(또는 발행자)를 `Observer`라 부른다.

`Observer`는 중요한 이벤트가 발생했을 때 모든 `Subject`에게 알려주며, 주로 이벤트 객체의 형태로 메세지를 `Subject`에게 전달한다.

