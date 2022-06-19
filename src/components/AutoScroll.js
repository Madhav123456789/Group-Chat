import React, { useEffect, useRef } from 'react'
import style from "./style.module.css";

function AutoScroll({ children, getFunction }) {
    const ref = useRef();

    // for checking is overflow activated or not
    function check() {
        var curOverf = ref.current.style.overflow;

        if (!curOverf || curOverf === "visible")
            ref.current.style.overflow = "hidden";

        var isOverflowing = ref.currentclientHeight < ref.current.scrollHeight;

        ref.current.style.overflow = curOverf;

        return isOverflowing;
    };

    //with smooth-scroll
    const scrollToBottomWithSmoothScroll = () => {
        if (check()) {
            ref.current.scrollTo({
                top: ref.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        scrollToBottomWithSmoothScroll();
        getFunction({
            func: scrollToBottomWithSmoothScroll
        })
    }, []);




    return (
        <>
            <div ref={ref} className={`msg-box w-[100%] min-h-[50%] overflow-y-auto my-2 ${style.scr_hide}`}>
                {children}
            </div>
        </>
    )
}

export default AutoScroll;