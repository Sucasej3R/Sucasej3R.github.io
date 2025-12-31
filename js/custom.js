/* ==================================================
   1. 唯美流星雨特效 (已修复层级遮挡问题)
   ================================================== */
   (function() {
    function star() {
        let s = document.createElement("div");
        s.style.position = "fixed";
        s.style.top = Math.random() * 40 + "%"; // 只在屏幕上半部分划过
        s.style.right = Math.random() * 100 + "%";
        s.style.width = "120px"; // 流星拖尾长度
        s.style.height = "2px";
        s.style.background = "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.8), rgba(255,255,255,0))";
        s.style.transform = "rotate(-45deg)";
        s.style.pointerEvents = "none"; // 极其重要：确保流星不会挡住鼠标点击
        s.style.zIndex = "1"; // 核心修复：放在背景图上面，而不是下面
        s.style.animation = "meteor 2.5s linear"; // 动画时长
        document.body.appendChild(s);

        setTimeout(() => { s.remove(); }, 2500); // 结束后销毁
    }
    
    // 注入流星动画样式
    let style = document.createElement('style');
    style.innerHTML = `
        @keyframes meteor {
            0% { opacity: 0; transform: translateX(0) translateY(0) rotate(-45deg); }
            20% { opacity: 1; }
            100% { opacity: 0; transform: translateX(-400px) translateY(400px) rotate(-45deg); }
        }
    `;
    document.head.appendChild(style);

    // 提高出现频率：每 600ms 尝试生成一次
    setInterval(() => {
        if(Math.random() > 0.4) star(); // 60% 的概率生成，效果更明显
    }, 600);
})();

/* ==================================================
   2. 鼠标点击炫彩波纹特效
   ================================================== */
(function() {
    var colors = ["#FF69B4", "#87CEFA", "#FFA500", "#EE82EE"]; // 二次元配色：粉、蓝、橙、紫
    
    document.addEventListener('click', function(e) {
        // 创建12个粒子
        for (var i = 0; i < 12; i++) {
            createParticle(e.clientX, e.clientY);
        }
    });

    function createParticle(x, y) {
        var p = document.createElement("div");
        document.body.appendChild(p);
        
        var size = Math.random() * 8 + 4; // 粒子大小 4~12px
        p.style.width = size + "px";
        p.style.height = size + "px";
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.position = "fixed";
        p.style.left = x + "px";
        p.style.top = y + "px";
        p.style.borderRadius = "50%";
        p.style.pointerEvents = "none";
        p.style.zIndex = "999999";
        
        // 随机扩散方向
        var destX = (Math.random() - 0.5) * 150;
        var destY = (Math.random() - 0.5) * 150;
        
        var animation = p.animate([
            { transform: "translate(0, 0) scale(1)", opacity: 1 },
            { transform: `translate(${destX}px, ${destY}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800 + Math.random() * 400,
            easing: "cubic-bezier(0, .9, .57, 1)"
        });
        
        animation.onfinish = function() { p.remove(); };
    }
})();

/* ==================================================
   3. 网页标题崩溃/欺骗特效 (卖萌用)
   ================================================== */
   var OriginTitle = document.title;
   var titleTime;
   document.addEventListener('visibilitychange', function () {
       if (document.hidden) {
           // 离开标签页时
           document.title = '(>_<) 居然跑了，快回来！';
           clearTimeout(titleTime);
       } else {
           // 回到标签页时
           document.title = '(*´∇｀*) 欢迎回家！';
           titleTime = setTimeout(function () {
               document.title = OriginTitle;
           }, 2000);
       }
   });
   
   /* ==================================================
      4. 底部运行时间显示 (Footer Runtime)
      ================================================== */
   // 请在 _config.butterfly.yml 的 footer: custom_text 里
   // 加入 <span id="timeDate"></span><span id="times"></span> 才能生效
   (function() {
       var now = new Date();
       function createtime() {
           // --- 这里修改你的建站时间 (格式：月/日/年 时:分:秒) ---
           var grt = new Date("01/01/2025 00:00:00");
           
           now.setTime(now.getTime() + 250);
           var days = (now - grt) / 1000 / 60 / 60 / 24;
           var dnum = Math.floor(days);
           var hours = (now - grt) / 1000 / 60 / 60 - (24 * dnum);
           var hnum = Math.floor(hours);
           if (String(hnum).length == 1) { hnum = "0" + hnum; }
           var minutes = (now - grt) / 1000 / 60 - (24 * 60 * dnum) - (60 * hnum);
           var mnum = Math.floor(minutes);
           if (String(mnum).length == 1) { mnum = "0" + mnum; }
           var seconds = (now - grt) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum);
           var snum = Math.round(seconds);
           if (String(snum).length == 1) { snum = "0" + snum; }
           
           // 只有当页面存在容器时才显示
           var timeDateElement = document.getElementById("timeDate");
           var timesElement = document.getElementById("times");
           if (timeDateElement && timesElement) {
               timeDateElement.innerHTML = "本站已安全运行 " + dnum + " 天 ";
               timesElement.innerHTML = hnum + " 小时 " + mnum + " 分 " + snum + " 秒";
           }
       }
       setInterval(createtime, 250);
   })();