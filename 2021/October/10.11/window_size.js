// 1. 처음부터 보여도 되는 태그라면 html 안에 만들어 주는 것이 정석
// 2. 태그 안 내용이 특정 이벤트 예 : 브라우저 크기 변경 에 따라 변경되어야 한다면 이벤트 감지 -> 함수 삽입 과정이 필요함
// 3. 변수를 선언 시 꼭 선언해야 하는 변수인지 생각 -> 그냥 사용하도 된다면 굳이 선언 x
// 4. 자바 스크립트 삽입 방법
// 5. live-server 사용 방법
// 6. 어디에 이벤트를 추가해줘야하지? 이벤트 이름이 뭐지 ? resize
// 7. 함수를 변수에 줄 수 있나 ? 함수 리턴값을 어떻게 작성해야 할까? : show_size

// 피드백
// innerHTML 부터 반복되니까 그 부분도 show_size 함수에 넣으면 좋겠지 ?
const show_size = () => `monitor: ${window.screen.availWidth}, ${window.screen.availHeight} <br/> 
browser : ${window.outerWidth}, ${window.outerHeight} <br/> 
scroll o : ${window.innerWidth}, ${window.innerHeight} <br/>
scroll x : ${document.documentElement.clientWidth}, ${document.documentElement.clientHeight}`;

const window_size = document.querySelector(".window_size");
window_size.innerHTML = show_size();

window.addEventListener("resize", () => {
  window_size.innerHTML = show_size();
});
