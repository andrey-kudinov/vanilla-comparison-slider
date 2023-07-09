const slider = (selector) => {
  const container = document.querySelector(selector);
  const before = container.querySelector('.before');
  const handle = container.querySelector('.handle');
  const beforeLabel = container.querySelector('.before-label');
  const afterLabel = container.querySelector('.after-label');

  let widthChange = 0;
  let mouseDown = false;

  const beforeInner = container.querySelector('.before-inner');
  beforeInner.style.width = `${container.offsetWidth}px`;

  const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
          beforeInner.style.width = `${entry.contentRect.width}px`;
      }
  });
  resizeObserver.observe(container);

  container.addEventListener('mousedown', () => mouseDown = true);
  container.addEventListener('mouseup', () => mouseDown = false);

  ['touchstart', 'touchmove', 'mousemove'].forEach((event) => {
      container.addEventListener(event, (e) => {
          if (event !== 'mousemove' && e.touches.length !== 1) {
              return;
          }
          if (!mouseDown && e.touches.length !== 1) {
              return;
          }

          const containerWidth = container.offsetWidth;
          const currentPoint = event === 'mousemove' ? e.offsetX : e.changedTouches[0].clientX;
          const startOfDiv = container.offsetLeft;
          const modifiedCurrentPoint = currentPoint - startOfDiv;

          if (modifiedCurrentPoint > 10 && modifiedCurrentPoint < containerWidth - 10) {
              widthChange = modifiedCurrentPoint / containerWidth * 100;
              before.style.width = `${widthChange}%`;
              handle.style.left = `${widthChange}%`;
              afterLabel.style.opacity = 1 - (widthChange / 100);
              beforeLabel.style.opacity = widthChange / 100;
          }
      });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  slider('.slider');
});
