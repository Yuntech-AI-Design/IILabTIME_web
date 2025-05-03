<template>
    <section class="w-full h-[58vh] pt-[8vh] px-[5%]">
        <div class="flex items-center justify-center w-full h-full">
            <div class="flex flex-col items-start justify-between w-[75%] h-full">
                <!-- <div
                    class="text-animation text-start relative text-[12.375rem] font-passion tracking-wide leading-none">
                    {{ text1 }}
                </div> -->
                <TextTitle :text="text1" />
                <TypingAnimation :text="text2"
                    className="inline-block w-[0.1em] h-[1em] bg-current ml-[0.1em] align-bottom animate-blink" />
            </div>
            <div class="flex flex-col items-center justify-center w-[25%] h-full">
                <div class="flex flex-row items-start justify-end w-full h-[60%] p-[2%]">
                    <div class="flex flex-row items-center justify-start w-full h-auto p-[2%] text-2xl mt-1">
                        AI專班實習專用平台 <br>
                        一站式實習追蹤、管理與評估平台
                    </div>
                </div>
                <div class="flex flex-col items-center justify-center w-full h-[40%]">
                    <div v-for="button in buttonList" :key="button.id"
                        class="flex flex-row items-center justify-center w-full h-auto p-[2%]">
                        <HomeButton :routerLink="button.routerLink" :buttonText="button.buttonText"
                            :buttonIcon="button.buttonIcon" :backgroundColor="button.backgroundColor" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import TypingAnimation from '@/components/Home/TypingAnimation.vue'
import HomeButton from '@/components/Home/HomeButton.vue'
import TextTitle from './TextTitle.vue'

const text1 = 'AI專班實習'
const text2 = '管理系統'

const buttonList = [
    { id: "2", routerLink: "#about", buttonText: "關於我們", buttonIcon: ['fas', 'info-circle'], backgroundColor: "bg-Ghibli-green" },
    { id: "1", routerLink: "/login", buttonText: "Google 登入", buttonIcon: ['fab', 'google-plus'], backgroundColor: "bg-Ghibli-blue" }
]

</script>
