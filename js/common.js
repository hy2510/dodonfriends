// 공통 헤더 로드 및 활성 메뉴 설정 함수
function loadHeaderAndSetActiveMenu(currentPage) {
  fetch("components/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;

      // 현재 페이지에 해당하는 메뉴 아이템에 활성 클래스 추가
      const navLinks = document.querySelectorAll(".navigation a");
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === currentPage) {
          link.classList.add("active");
        }
      });
    })
    .catch((error) => {
      console.error("헤더 로드 중 오류 발생:", error);
    });
}

// 공통 푸터 로드 함수
function loadFooter() {
  fetch("components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;

      // 푸터 로드 후 move-top 버튼 기능 초기화
      initializeMoveTop();
    })
    .catch((error) => {
      console.error("푸터 로드 중 오류 발생:", error);
    });
}

// move-top 버튼 기능 초기화 함수
function initializeMoveTop() {
  const moveTopBtn = document.querySelector(".move-top");

  if (!moveTopBtn) return;

  // 초기에는 숨김
  moveTopBtn.style.display = "none";

  // 스크롤 이벤트 리스너 추가
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      moveTopBtn.style.display = "block";
    } else {
      moveTopBtn.style.display = "none";
    }
  });

  // 클릭 이벤트 리스너 추가
  moveTopBtn.addEventListener("click", function (e) {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// 탭 기능 초기화 함수
function initializeTabs() {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  if (tabs.length === 0) return;

  // 첫 번째 탭을 기본 활성화
  if (tabs.length > 0) {
    tabs[0].classList.add("active");
  }

  // 모든 탭 콘텐츠를 숨기고 첫 번째만 표시
  tabContents.forEach((content, index) => {
    if (index === 0) {
      content.style.display = "block";
    } else {
      content.style.display = "none";
    }
  });

  // 탭 클릭 이벤트 리스너 추가
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", function () {
      // 모든 탭에서 active 클래스 제거
      tabs.forEach((t) => t.classList.remove("active"));

      // 클릭된 탭에 active 클래스 추가
      this.classList.add("active");

      // 모든 탭 콘텐츠 숨기기
      tabContents.forEach((content) => {
        content.style.display = "none";
      });

      // 해당하는 탭 콘텐츠 표시
      if (tabContents[index]) {
        tabContents[index].style.display = "block";

        // 탭 콘텐츠의 상단에서 200px 아래 지점으로 부드럽게 스크롤
        setTimeout(() => {
          const elementTop = tabContents[index].offsetTop;
          const offsetPosition = elementTop - 200;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 100); // 콘텐츠가 표시된 후 스크롤 실행
      }
    });
  });
}

// 페이지 로드 시 헤더 및 푸터 로드
document.addEventListener("DOMContentLoaded", function () {
  // 현재 페이지 파일명을 자동으로 감지
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // 헤더 로드 및 활성 메뉴 설정
  loadHeaderAndSetActiveMenu(currentPage);

  // 푸터 로드
  loadFooter();

  // 탭 기능 초기화
  initializeTabs();
});
