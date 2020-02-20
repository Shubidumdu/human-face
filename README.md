<img src="./src/components/imgs/title-thick2.png"/>

## 얼굴 분석 웹 애플리케이션

- 이용은 [여기](https://human-face-report.herokuapp.com/)에서 하실수 있습니다.

- 해당 애플리케이션은 Naver Clova Api를 사용합니다.

<img src="./sample/sample_crop.png"/>

- 분석하고자 하는 얼굴 이미지를 애플리케이션을 통해 첨부, 제출해주세요!

<img src="./sample/sample_app.png">

- 해당 이미지의 닮은꼴 유명인, 나이, 성별, 표정을 정확도와 함께 보고서 형태로 제출해줄 겁니다!

## 라이브러리

### 해당 앱에는 다음과 같은 스택들이 사용되었습니다.

- react (CRA)
  - react-alert
  - react-icons
  - react-image-crop
  - react-loader-spinner
  - react-modal
  - react-redux
- typescript
- redux / redux-thunk
- styled-components
  - styled-reset
- ExpressJS
- multer

## 유의사항

- Clova API 자체의 제한으로서, 일일 호출 허용량은 1000건입니다. 따라서 경우에 따라 웹의 동작이 불가능할 수 있습니다.
