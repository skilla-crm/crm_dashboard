import s from './Loader.module.scss';

const Loader = ({ width, height, top }) => {
    return (
        <div
            style={{
                width: `${width}px`,
                height: `${height}px`,
                marginTop: `${top}px`,
            }}
            className={`${s.loader}`}
        ></div>
    );
};

export default Loader;

