import { TArticle } from '../../types'
import s from './Recommendations.module.css'
import leftArrow from '../../imges/leftArrow.svg'
import leftArrowDisabled from '../../imges/leftArrowDisabled.svg'
import rightArrow from '../../imges/rightArrow.svg'
import rightArrowDisabled from '../../imges/rightArrowDisabled.svg'
import { useEffect, useState } from 'react'

const articleImgWidth = 36

const scroll = (direction: 'left' | 'right') => {
    const imageList = document.querySelector(".image-list");
    const vw = window.innerWidth

    const scrollAmount = (vw * articleImgWidth / 100) * (direction === 'right' ? 1 : -1);
    imageList?.scrollBy({ left: scrollAmount, behavior: "smooth" });
}

export const Recommendations = ({articles}: {articles: TArticle[]}) => {
    const [isLeftDisabled, setIsLeftDisabled] = useState(true)
    const [isRightDisabled, setIsRightDisabled] = useState(false)

    useEffect(()=> {
        const imageList = document.querySelector(".image-list");
        const maxScrollLeft = imageList!.scrollWidth - imageList!.clientWidth;
        
        const handleSlideButtons = () => {
            imageList!.scrollLeft <= 0 ? setIsLeftDisabled(true) : setIsLeftDisabled(false);
            imageList!.scrollLeft >= maxScrollLeft ? setIsRightDisabled(true) : setIsRightDisabled(false);
        }
        imageList?.addEventListener("scroll", handleSlideButtons)

        return () => {
            imageList?.removeEventListener("scroll", handleSlideButtons);
        }
    }, [])

    return (
        <div className={s.container}>
            <div>
                <div className={s.textContainer}>
                    <h1 className={s.title}>Полезные материалы</h1>
                    <p className={s.description}>
                        Собрали для вас полезные исследования схемы кормления и другие материалы, 
                        которые пригодятся для лучших результатов на вашем хозяйстве
                    </p>
                </div>
                <div>
                    {/* todo добавить ссылки на карточки и заменить а на NavLink */}
                    <div className={`${s.articles} image-list`}>
                        {
                            articles.map(el => 
                                <div key={el.id}>
                                    <img 
                                        src={el.img} 
                                        alt={el.title}
                                        className={`${s[el.types]} ${s.articlesImg}`} 
                                    />
                                    <div className={s.articleCardText}>
                                        <a href={`${el.id}`}>
                                            {el.title}
                                        </a> 
                                        <p>{el.date}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className={s.arrows}>
                        {/* arrow btn to left */}
                        <button 
                            id="prev-slide"
                            onClick={()=> scroll('left')}
                            className={`${s.arrowBtn} slide-button`}
                            disabled={isLeftDisabled }
                        >
                            <img 
                                src={isLeftDisabled ? leftArrowDisabled : leftArrow} 
                                alt="leftArrow"
                                className={s.arrowImg}
                            />
                        </button>
                         {/* arrow btn to right */}
                        <button 
                            id="next-slide"
                            onClick={()=> scroll('right')}
                            className={`${s.arrowBtn} slide-button`}
                            disabled={isRightDisabled}
                        >
                            <img 
                                src={isRightDisabled ? rightArrowDisabled : rightArrow} 
                                alt="rightArrow"
                                className={s.arrowImg}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}