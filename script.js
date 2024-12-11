let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  moveX = 0;
  moveY = 0;
  prevX = 0;
  prevY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    const startEvent = (e) => {
      e.preventDefault(); // Prevent default scrolling (on touch) or selection (on mouse)
      if (this.holdingPaper) return;

      this.holdingPaper = true;

      paper.style.zIndex = highestZ++;
      const isTouch = e.type.startsWith("touch");
      const point = isTouch ? e.touches[0] : e;

      this.startX = point.clientX;
      this.startY = point.clientY;
      this.prevX = this.startX;
      this.prevY = this.startY;
    };

    const moveEvent = (e) => {
      if (!this.holdingPaper) return;

      const isTouch = e.type.startsWith("touch");
      const point = isTouch ? e.touches[0] : e;

      this.moveX = point.clientX;
      this.moveY = point.clientY;

      this.velX = this.moveX - this.prevX;
      this.velY = this.moveY - this.prevY;

      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;

      this.prevX = this.moveX;
      this.prevY = this.moveY;
    };

    const endEvent = () => {
      this.holdingPaper = false;
    };

    // Mouse Events
    paper.addEventListener("mousedown", startEvent);
    document.addEventListener("mousemove", moveEvent);
    document.addEventListener("mouseup", endEvent);

    // Touch Events
    paper.addEventListener("touchstart", startEvent);
    document.addEventListener("touchmove", moveEvent);
    document.addEventListener("touchend", endEvent);
  }
}

const papers = Array.from(document.querySelectorAll(".paper"));

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
