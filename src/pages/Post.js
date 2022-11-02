import React from "react";

const Post = () => {

    const visit = () => {
        window.open("https://karo.land/", "_blank");
    }

    return (
        <>
            <div style={{backgroundImage: `url("pixabay.jpg")`, backgroundRepeat: 'no-repeat', backgroundSize: "cover", paddingTop: "6%", paddingLeft: "2%", paddingBottom: "15%"}}>
                <div className="pt-3 pl-3 pb-5 w-7/12 bg-white rounded-lg">
                    <h1 className="text-red-800 lg:text-[45px] leading-none mb-6 font-medium">
                        Để đăng tin, hãy vào trang Karo.Land
                    </h1>
                    <button className='bg-red-800 hover:bg-gray-600 text-xl rounded-lg text-white px-5 py-3'
                        onClick={visit}>
                        Vào trang Karo.Land
                    </button>
                </div>
                <div style={{padding: '12%'}}></div>
            </div>
        </>
    );
}
export default Post;