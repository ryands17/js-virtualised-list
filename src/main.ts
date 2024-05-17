import './style.css';

// Generate mock data
const data = Array.from({ length: 1000 }, (_, i) => ({
  username: `User${i}`,
  avatar: `https://picsum.photos/50/50?random=${i}`,
  comment: `This is comment ${i}`,
}));

const container = document.querySelector('#list-container')!;
const list = document.querySelector('#list')!;

let start = 0;
let end = 30;

// Create a pool of reusable nodes
const nodePool = Array.from({ length: 30 }, (_, i) => {
  const div = document.createElement('div');
  div.className = 'list-item';
  div.innerHTML =
    '<img alt="Avatar"/><span class="username"></span><span class="comment"></span>';
  div.style.position = 'absolute';
  div.style.top = `${i * 40}px`; // Position the node based on its index
  list.appendChild(div);
  return div;
});

// Create a placeholder element with the total height of the data
const placeholder = document.createElement('div');
placeholder.style.height = `${data.length * 40}px`; // each item has a height of 40px
list.appendChild(placeholder);

function render() {
  const visibleData = data.slice(start, Math.min(end, data.length));
  for (let i = 0; i < nodePool.length; i++) {
    const div = nodePool[i];
    if (i < visibleData.length) {
      const item = visibleData[i];
      div.querySelector('.username')!.textContent = item.username;
      div.querySelector('img')!.src = item.avatar;
      div.querySelector('.comment')!.textContent = item.comment;
      div.style.top = `${(start + i) * 40}px`; // Update the position of the node based on its index in the data array
    } else {
      div.style.display = 'none'; // Hide the node if it's not in the visible range
    }
  }
}

container.addEventListener('scroll', () => {
  const scrollTop = container.scrollTop;
  start = Math.floor(scrollTop / 40); // Assuming each item has a height of 40px
  end = start + 30;
  render();
});

render();
