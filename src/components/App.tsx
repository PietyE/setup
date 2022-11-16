import styles from '@styles/App.module.css';

const App = () => {
    return ( <div className={styles.container}>
        <p className={styles.text}>Hello React</p>
        <p>test</p>
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" width="200px" height="200px" />
    </div> )
}

export default App;
