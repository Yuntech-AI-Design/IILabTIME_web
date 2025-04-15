
export const typingAnimation = {
    // mounted(el, binding){
    // }
    startTypingText(){
        let text = this.text;
        let text_shown = '';
        this.typeText(text, text_shown); // Call typeText using 'this'
    },
    typeText(text, text_shown){
        if (text_shown.length < text.length) {
            text_shown += text.charAt(text_shown.length);
            this.text_shown = text_shown;
            setTimeout(() => { this.typeText(text, text_shown)}, Math.floor(Math.random() * 100) + 50); // 隨機延遲
        } else {
            setTimeout(() => this.startTypingText(), 2000); // 完成後等待2秒再開始打下一段文字
        }
    },
    mounted(el, binding){
        this.text = binding.value.text; // 取得傳入的文字
        this.text_shown = ''; // 初始化顯示的文字
        this.startTypingText(); // 開始打字動畫
    }
}