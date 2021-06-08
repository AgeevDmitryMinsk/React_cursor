// Корневой компонент приложения
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isCustomCursor: false };
    }

    handleChange = () => {
        this.setState({
            isCustomCursor: !this.state.isCustomCursor,
        });
    };

    render() {
        return (
            <>
                <label>
                    <input type="checkbox" onChange={this.handleChange} />
                    — Включить REACT курсор
                </label>
                {this.state.isCustomCursor && <NeonCursor />}
            </>
        );
    }
}

// Компонент, отвечающий за кастомизированный курсор
class NeonCursor extends React.Component {
    constructor(props) {
        super(props);

        this.state = { top: 0, left: 0 };
    }

    // Метод будет вызван сразу после монтирования: создаём эффекты
    componentDidMount() {
        document.addEventListener('mousemove', this.handleMouseMove);
        document.documentElement.classList.add('no-cursor');
    }

    // Метод будет вызван непосредственно перед размонтированием: удаляем эффекты
    componentWillUnmount() {
        document.documentElement.classList.remove('no-cursor');
        document.removeEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseMove = (event) =>    {
        this.setState({
            top: event.pageY,
            left: event.pageX,
        });
    }

    render() {
        return (
            <img
                src="./1200px-React-icon.svg.png"
                width="130"
                style={{
                    position: 'absolute',
                    top: this.state.top,
                    left: this.state.left,
                    pointerEvents: 'none',
                    opacity: '0.5'
                }}
            />
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));