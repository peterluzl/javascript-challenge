// from data.js
var tableData = data;

// YOUR CODE HERE!
const keys = [
  'datetime',
  'city',
  'state',
  'country',
  'shape',
  'durationMinutes',
  'comments',
];
const selectKeys = [
  'datetime',
  'city',
  'state',
  'country',
  'shape',
];

window.addEventListener('load', () => {
    const tbody = document.querySelector('tbody');
    const temp = {};
    tableData.forEach(item => {
      selectKeys.forEach(key => {
        if (temp[key]) {
          temp[key][item[key]] = 1;
        } else {
          temp[key] = {};
          temp[key][item[key]] = 1;
        }
      })
    });

    tbody.innerHTML = tableData.map(item => {
      return `
        <tr>
            ${keys.map(td => `<td>${item[td]}</td>`).join('')}
        </tr>
      `;
    }).join('');

    const list = document.querySelector('.list-group');

    list.innerHTML += Object.entries(temp).map(item => {
      return `
        <li class="filter list-group-item">
          <label for="${item[0]}">
              ${item[0]}:
              <select class="form-control" id="${item[0]}">
                  <option value="null">${item[0]}</option>
                  ${Object.entries(item[1]).map(option => `<option value="${option[0]}">${option[0]}</option>`)}
              </select>
          </label>
        </li>
      `
    }).join('');

    const filter = document.querySelector('#filter-btn');

    filter.addEventListener('click', () => {
      const value = selectKeys.reduce((acc, cur) => {
          const temp = document.querySelector(`#${cur}`);
          acc[cur] = temp.value;
          return acc;
      }, {});
      const filter = Object.entries(value).filter(item => item[1] !== 'null');
      if (filter.length) {
        const temp = tableData.filter(item => {
          let check = true;
          for (let i = 0; i <= filter.length - 1; i++) {
            console.log(filter[i][0], filter[i][1], item)
            if (item[filter[i][0]] !== filter[i][1]) {
              check = false;
            }
          }
          return check;
        });
        tbody.innerHTML = temp.map(item => {
            return `
              <tr>
                  ${keys.map(td => `<td>${item[td]}</td>`).join('')}
              </tr>
            `;
          }).join('');
      }
    });

})
