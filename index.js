import './style.css';
import { apiurl } from './src/constants';

document.title = 'prework';

const characters = document.querySelector('section');

async function getCharacters() {
  const response = await fetch(apiurl, {
    method: 'GET',
  });

  return await response.json();
}

async () => {
  var loading = true;
  let { results, info } = await getCharacters();

  document.querySelector('.search > input').value = 1;
  document.querySelector('.search > input').max = info.pages;
  document.querySelector('.search > span').innerText = info.pages;

  document.querySelector('.search > input').addEventListener('change', (e) => {
    e.preventDefault();
    let pageNumber = parseInt(e.target.value);
    loading = false;
    fetch(`${apiurl}?page=${pageNumber}`, {
      method: 'GET',
    })
      .then(function (res) {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        results = res.results;
        loading = true;
        all2();
      });
  });

  function getOnlyAlives() {
    characters.innerHTML = '';

    rend(
      results.filter(function (value) {
        return value.status === 'Alive';
      })
    );
  }

  function deadsOnly() {
    characters.innerHTML = '';

    rend(
      results.filter(function (value) {
        return value.status == 'Dead';
      })
    );
    //todo render filtered results!
  }

  function all2() {
    characters.innerHTML = '';
    // todo
    rend(results);
  }

  alive.addEventListener('click', getOnlyAlives);
  dead.addEventListener('click', deadsOnly);
  all.addEventListener('click', all2);

  // adding results to DOM!
  function rend(results) {
    if (loading) {
      for (let index in results) {
        console.log(results);
        const p = document.createElement('p');
        const lp = document.createElement('span');

        lp.innerText = index + 1;
        const text = document.createTextNode(' ' + results[index].name);
        p.prepend(lp, text);

        characters.append(p);

        p.addEventListener('click', () => clickName(index));
      }
    } else {
      characters.innerHTML = '';
    }
  }

  function clickName(index) {
    results[index];
    const n = document.createElement('div');
    const gender = document.createElement('div');
    const status = document.createElement('div');
    const jpg = document.createElement('img');
    jpg.width = '100';

    n.innerText = 'imie: ' + results[index].name;
    gender.innerText = 'płeć: ' + results[index].gender;
    status.innerText = 'status: ' + results[index].status;
    jpg.src = results[index].image;

    const details = document.querySelector('section:not(:first-child)');

    details.append(n, gender, status, jpg);

    jpg.onclick = () => {
      const dialog = document.createElement('dialog');
      document.body.append(dialog);

      dialog.append(jpg);
      jpg.width = 300;

      dialog.showModal();

      const close = document.createElement('button');

      close.innerText = 'zamknij';

      close.addEventListener('click', () => {
        details.append(close);
      });

      dialog.append(close);
    };
  }
  rend(results);
};
