document.addEventListener("DOMContentLoaded", function () {
    const explorePage = document.getElementById("explorePage");
    const blocks = document.querySelectorAll(".block");

    // 讓整個頁面淡入
    setTimeout(() => {
        explorePage.classList.add("fade-in");
    }, 100);

    // 讓 .block 依序淡入
    blocks.forEach((block, index) => {
        setTimeout(() => {
            block.classList.add("fade-in");
        }, index * 100);
    });
});

// 🌟 Explore More 按鈕並加入 body
const exploreButton = document.createElement("button");
exploreButton.innerHTML = 'Explore More <span class="arrow">→</span>';
exploreButton.id = "exploreMoreButton";
exploreButton.style.display = "none"; 
document.body.appendChild(exploreButton);

// Debug：檢查 innerHTML 是否正確
console.log(exploreButton.innerHTML);


// 🌟 按鈕點擊後導向 explore.html
exploreButton.addEventListener("click", function () {
    document.body.style.transition = "opacity 0.8s ease-out"; 
    document.body.style.opacity = "0";

    setTimeout(() => {
        window.location.href = "explore.html"; 
    }, 800); 
});


document.addEventListener("DOMContentLoaded", function () {
    let infoButton = document.getElementById("infoButton");
    let infoPanel = document.getElementById("infoPanel");
    let closeButton = document.getElementById("closeButton");

    // ✅ 點擊 Info 按鈕，開啟視窗
    infoButton.addEventListener("click", function () {
        infoPanel.classList.add("active");
    });

    // ✅ 點擊 Close 按鈕，關閉視窗
    closeButton.addEventListener("click", function () {
        infoPanel.classList.remove("active");
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const generateButton        = document.getElementById('generateButton');
    const generateFlowerButton  = document.getElementById('generateFlowerButton');
    const backButton            = document.getElementById('backButton');
    const videoContainerExplore = document.getElementById('videoContainerExplore');
    const exploreVideo          = document.getElementById('exploreVideo');
    const videoText             = document.getElementById('videoText');
    const viewContainer         = document.querySelector('.view');
    const infoPanel             = document.getElementById('infoPanel');
    const blurBackground        = document.querySelector('.blur-background');
  
    // 共用的顯示文字
    const sharedText = '原本這個網站的前半部分有連動Open Ai，\n' +
                       '但Open Ai的程式碼要上傳到Github有點複雜，所以以影片的方式說明前半段的網頁。';
  
    function showVideo() {
      // 隱藏原本畫面
      if (viewContainer) viewContainer.style.display = 'none';
  
      // 先移除先前可能還在的 fade-in class
      videoContainerExplore.classList.remove('fade-in');
      // 強制重繪（reflow）
      // eslint-disable-next-line no-unused-expressions
      videoContainerExplore.offsetWidth;
  
      // 顯示並淡入
      videoContainerExplore.classList.add('fade-in');
      exploreVideo.currentTime = 0;
      exploreVideo.muted = false;
      exploreVideo.play();
  
      // 顯示文字
      if (videoText) {
        videoText.textContent = sharedText;
        videoText.style.display = 'block';
      }
    }
  
    // Generate 按鈕
    if (generateButton) {
      generateButton.addEventListener('click', showVideo);
    }
  
    // Info Panel 裡的花朵按鈕，先關 panel 再顯示影片
    if (generateFlowerButton) {
      generateFlowerButton.addEventListener('click', () => {
        if (infoPanel)      infoPanel.classList.remove('active');
        if (blurBackground) blurBackground.classList.remove('show');
        showVideo();
      });
    }
  
    // Back 按鈕：重整整頁回初始
    if (backButton) {
      backButton.addEventListener('click', () => {
        location.reload();
      });
    }
});
  

document.addEventListener("DOMContentLoaded", function () {
    const infoButton = document.getElementById("infoButton");
    const closeButton = document.getElementById("closeButton");
    const infoPanel = document.getElementById("infoPanel");
    const blurBackground = document.querySelector(".blur-background");
    const blocks = document.querySelectorAll(".block");

    if (!infoButton || !closeButton || !infoPanel || !blurBackground || !blocks.length) {
        console.error("❌ 找不到某些元素，請檢查 HTML 結構！");
        return;
    }

    // ✅ 點擊 Info 按鈕，開啟視窗並模糊背景
    infoButton.addEventListener("click", function () {
        infoPanel.classList.add("active");
        blurBackground.classList.add("show"); // 確保背景模糊
    });

    // ✅ 點擊 block 也會模糊背景
    blocks.forEach(block => {
        block.addEventListener("click", function () {
            showFloatingBlock(this);
            blurBackground.classList.add("show"); // 讓背景模糊
        });
    });

    // ✅ 點擊 Close 按鈕，關閉視窗 & 確保不影響其他模糊效果
    closeButton.addEventListener("click", function () {
        infoPanel.classList.remove("active");

        // **檢查是否還有浮動的 block，避免誤移除背景模糊**
        setTimeout(() => {
            const floatingBlock = document.querySelector(".floating-block");
            if (!floatingBlock) {
                blurBackground.classList.remove("show");
            }
        }, 300);
    });

    // ✅ 點擊背景時，完全關閉所有彈窗
    blurBackground.addEventListener("click", function () {
        infoPanel.classList.remove("active");

        const floatingBlock = document.querySelector(".floating-block");
        if (floatingBlock) {
            closeFloatingBlock(floatingBlock, blurBackground);
        } else {
            blurBackground.classList.remove("show"); // 移除模糊
        }
    });
});

// ✅ 修正 showFloatingBlock，避免重複新增 `.blur-background`
function showFloatingBlock(originalBlock) {
    let blurBackground = document.querySelector(".blur-background");
    
    // 確保背景模糊已存在
    if (!blurBackground) {
        blurBackground = document.createElement("div");
        blurBackground.classList.add("blur-background");
        document.body.appendChild(blurBackground);
    }

    // 取得原始圖片的路徑
    const frontImage = originalBlock.querySelector("img").src;
    const backImage = frontImage.replace(/(images\d+)\.jpg$/, "$1_back.jpg");

    // **移除舊的浮動 block**
    document.querySelectorAll(".floating-block").forEach(el => el.remove());

    // 創建新的浮動 block
    const floatingBlock = document.createElement("div");
    floatingBlock.classList.add("floating-block");
    floatingBlock.innerHTML = `<img src="${backImage}" alt="Expanded Image">`;

    // 插入到 body
    document.body.appendChild(floatingBlock);

    // 小延遲確保 transition 正常
    setTimeout(() => {
        floatingBlock.classList.add("show");
        blurBackground.classList.add("show");
    }, 10);
}

// ✅ 修正 closeFloatingBlock 確保背景不被誤刪
function closeFloatingBlock(floatingBlock, blurBackground) {
    floatingBlock.classList.remove("show");
    floatingBlock.classList.add("hide");

    setTimeout(() => {
        floatingBlock.remove();

        // 確保沒有其他彈窗時才移除背景模糊
        const infoPanel = document.getElementById("infoPanel");
        if (!infoPanel.classList.contains("active")) {
            blurBackground.classList.remove("show");
        }
    }, 200);
}


