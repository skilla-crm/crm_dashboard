import s from './Loader.module.scss';

const Loader = () => {
    return (
        <div className={s.loader}>
            <div className={s.loaderInner}></div>
        </div>
    );
};

export default Loader;

