import './style.css';
import './app/raw-wc';
import './app/skate-wc';

console.log('hello');

const mountPoint = document.getElementById('app');


const App = `
    <h4>Raw WC</h4>
    <my-smile tabindex="1" smile=":)">
        <p>This will be projected to default slot</p>
        <p slot="description">this is desc...</p>
    </my-smile>

    <h4>SkateJS WC</h4>
    <x-counter></x-counter>
    <my-counter></my-counter>
    <x-hello name="fofof"></x-hello>
`;
mountPoint.innerHTML = App;
