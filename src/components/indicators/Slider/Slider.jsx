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
import buildSlides from './buildSlides';
import Loader from './Loader/Loader';
import TitleWithLink from 'components/ui/TitleWithLink/TitleWithLink';

const Slider = ({ data, prevPeriod, isLoading }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0)

    return (
        <div className={s.root}>

            <TitleWithLink
                title={buildSlides(data)?.[activeSlideIndex]?.title}
                size="small"
                withLink={false}
            />
            <div>
                <button
                    ref={prevRef}
                    className={classNames(s.navPrev, isBeginning && s.hidden)}
                    type="button"
                >
                    <ChevronLeftIcon />
                </button>

                <button
                    ref={nextRef}
                    className={classNames(s.navNext, isEnd && s.hidden)}
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
                    onSlideChange={(swiper) => setActiveSlideIndex(swiper.activeIndex)}

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
                    {buildSlides(data).map((slide, index) => (
                        <SwiperSlide key={index}>
                            <CardSlider
                                indicator={slide.indicator}
                                increase={slide.increase}
                                data={slide.data}
                                title={slide.title}
                                prevPeriod={prevPeriod}
                                isLoading={isLoading}
                                reverse={slide.reverse}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className={classNames(s.loader, isLoading && s.loader_load)}>
                <Loader />
            </div>
        </div>
    );
};

export default Slider;
