import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import CardSlider from './CardSlider';
import { ReactComponent as ChevronLeftIcon } from 'assets/icons/iconChewronLeft.svg';
import { ReactComponent as ChevronRightIcon } from 'assets/icons/iconChewronRight.svg';
import s from './Slider.module.scss';
import { useRef, useState } from 'react';
import classNames from 'classnames';
import TitleWithLink from 'components/ui/TitleWithLink/TitleWithLink';

const slides = [
    {
        title: 'Количество заказов',
        total: 20,
        change: 12,
        data: [
            { name: 'Завершены', value: 245, color: '#A9F3C5' },
            { name: 'В работе', value: 32, color: '#D7C7FF' },
            { name: 'Отменены', value: 36, color: '#F3C1B8' },
            { name: 'В черновиках', value: 7, color: '#F8DB9B' },
        ],
    },
    {
        title: 'Сумма заказов',
        total: '400 000 ₽',
        change: 12,
        data: [
            { name: 'Завершены', value: 245000, color: '#A9F3C5' },
            { name: 'В работе', value: 32000, color: '#D7C7FF' },
            { name: 'Отменены', value: 36000, color: '#F3C1B8' },
            { name: 'В черновиках', value: 7000, color: '#F8DB9B' },
        ],
    },
    {
        title: 'Способ оплаты',
        total: '',
        change: null,
        data: [
            { name: 'Наличными', value: 5, color: '#D7C7FF' },
            { name: 'Безнал. расчет', value: 20, color: '#BFD6FF' },
            { name: 'На карту', value: 1, color: '#F8DB9B' },
        ],
    },
];

const Slider = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    return (
        <div className={s.root}>
            <TitleWithLink
                title="Количество заказов"
                size="small"
                withLink={false}
            />
            <div>
                <button
                    ref={prevRef}
                    className={`${s.navPrev} ${isBeginning ? s.hidden : ''}`}
                    type="button"
                >
                    <ChevronLeftIcon />
                </button>

                <button
                    ref={nextRef}
                    className={`${s.navNext} ${isEnd ? s.hidden : ''}`}
                    type="button"
                >
                    <ChevronRightIcon />
                </button>

                <Swiper
                    modules={[Pagination, Navigation]}
                    slidesPerView={1}
                    spaceBetween={20}
                    className={s.swiper}
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();

                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);

                        swiper.on('slideChange', () => {
                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        });
                    }}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <CardSlider {...slide} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Slider;
