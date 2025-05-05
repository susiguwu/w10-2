document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.querySelector('.select-language');
    const languageToggle = document.querySelector('.select-language-toggle');
    const languageDropdown = document.querySelector('.select-language-dropdown');
    const languageLinks = languageDropdown.querySelectorAll('a');
    const currentLanguageSpan = languageToggle.querySelector('.current-language');

    // 預設關閉語言選單
    languageDropdown.style.display = 'none';

    languageToggle.addEventListener('click', function() {
        languageDropdown.style.display = languageDropdown.style.display === 'block' ? 'none' : 'block';
        languageSelect.classList.toggle('open'); // 同時切換 open class 來控制樣式
    });

    languageLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const lang = this.dataset.lang;
            currentLanguageSpan.textContent = this.textContent;
            languageDropdown.style.display = 'none'; // 點擊後關閉選單
            languageSelect.classList.remove('open'); // 移除 open class

            // 呼叫翻譯函式
            translatePage(lang);
        });
    });

    // 點擊視窗其他地方關閉選單
    document.addEventListener('click', function(event) {
        if (!languageSelect.contains(event.target)) {
            languageDropdown.style.display = 'none';
            languageSelect.classList.remove('open');
        }
    });

    // 翻譯函式 (你需要提供翻譯內容)
    function translatePage(lang) {
        const translatableElements = document.querySelectorAll('[data-lang]');
        translatableElements.forEach(element => {
            const key = element.dataset.lang;
            const translatedText = translations[lang] && translations[lang][key];
            if (translatedText) {
                if (element.tagName === 'INPUT' && element.placeholder) {
                    element.placeholder = translatedText;
                } else {
                    element.textContent = translatedText;
                }

                // 切換顯示對應語言的內容
                translatableElements.forEach(otherElement => {
                    if (otherElement.dataset.lang === key) {
                        if (otherElement.classList.contains(lang)) {
                            otherElement.classList.remove('hidden');
                        } else if (otherElement.dataset.lang === key && otherElement.classList.contains('hidden')) {
                            // 如果是相同 data-lang 但不是目前選取的語言，則隱藏
                            if (!otherElement.classList.contains(lang) && lang !== key) {
                                otherElement.classList.add('hidden');
                            } else if (lang === key) {
                                otherElement.classList.remove('hidden');
                            }
                        } else if (lang === key) {
                            otherElement.classList.remove('hidden');
                        } else if (key === 'zh-tw' && lang !== 'zh-tw') {
                            // 預設顯示中文，切換到其他語言時隱藏中文
                            otherElement.classList.add('hidden');
                        }
                    } else if (otherElement.dataset.lang !== 'zh-tw' && otherElement.classList.contains('hidden') && otherElement.classList.contains(lang)) {
                        otherElement.classList.remove('hidden');
                    } else if (otherElement.dataset.lang !== 'zh-tw' && !otherElement.classList.contains('hidden') && !otherElement.classList.contains(lang)) {
                        otherElement.classList.add('hidden');
                    } else if (otherElement.dataset.lang === 'zh-tw' && lang !== 'zh-tw') {
                        otherElement.classList.add('hidden');
                    }
                });
            } else if (lang === 'zh-tw') {
                // 如果沒有該語言的翻譯，預設顯示中文
                if (element.tagName === 'INPUT' && element.placeholder) {
                    // 如果原本的 placeholder 是其他語言，切換回中文的 placeholder (如果有的話)
                    const originalPlaceholder = document.querySelector(`[data-lang="zh-tw"][id="${element.id}"]`)?.placeholder;
                    if (originalPlaceholder) {
                        element.placeholder = originalPlaceholder;
                    }
                } else if (!element.classList.contains('zh-tw')) {
                    // 如果原本的文字不是中文，切換回中文 (如果有的話)
                    const originalTextElement = document.querySelector(`[data-lang="zh-tw"][id="${element.id}"]`);
                    if (originalTextElement) {
                        element.textContent = originalTextElement.textContent;
                    }
                }
                // 切換顯示對應中文的內容
                translatableElements.forEach(otherElement => {
                    if (otherElement.dataset.lang === key) {
                        otherElement.classList.remove('hidden');
                    } else if (otherElement.dataset.lang !== 'zh-tw') {
                        otherElement.classList.add('hidden');
                    }
                });
            }
        });
    }

    // 翻譯內容 (你需要在這裡填寫其他語言的翻譯)
    const translations = {
        'en': {
            '♡蛻變之旅': '♡Metamorphosis Journey',
            '課程特色': 'Course Features',
            '聯絡我們': 'Contact Us',
            '關於我們': 'About Us',
            '聲波共鳴：喚醒內在力量': 'Sound wave resonance: Awaken inner power',
            '生命沉思：重塑人生視野': 'Life contemplation: Reshape life vision',
            '願景塑造：描繪豐盛未來': 'Vision shaping:描繪豐盛未來',
            '智慧交流：啟迪成長思維': 'Wisdom exchange: Inspire growth mindset',
            '♡課程目標與評估♡': '♡Course Objectives and Evaluation♡',
            '目標': 'Goal',
            '說明': 'Description',
            '覺察自我': 'Self-awareness',
            '透過練習與反思，提升自我認識的深度。': 'Enhance self-awareness through practice and reflection.',
            '情緒管理': 'Emotion management',
            '學習有效的情緒調節技巧，增進內在平靜。': 'Learn effective emotional regulation techniques to enhance inner peace.',
            '目標設定': 'Goal setting',
            '掌握設定個人成長目標的方法，強化實踐動力。': 'Master the methods of setting personal growth goals and strengthen the motivation for practice.',
            '關係建立': 'Relationship building',
            '培養健康的溝通模式，促進良好的人際互動。': 'Cultivate healthy communication patterns to promote good interpersonal interactions.',
            '♡聯絡我們♡': '♡Contact Us♡',
            '姓名': 'Name',
            '您的姓名': 'Your Name',
            '電子郵件': 'Email',
            '您的電子郵件': 'Your Email',
            '訊息': 'Message',
            '您的訊息': 'Your Message',
            '送出訊息': 'Send Message',
            '© 2025 蛻變之旅': '© 2025 Metamorphosis Journey'
        },
        'ja': {
            '♡蛻變之旅': '♡変革の旅',
            '課程特色': 'コースの特徴',
            '聯絡我們': 'お問い合わせ',
            '關於我們': '私たちについて',
            '聲波共鳴：喚醒內在力量': '音波共鳴：内なる力を呼び覚ます',
            '生命沉思：重塑人生視野': '生命の瞑想：人生の視野を再構築する',
            '願景塑造：描繪豐盛未來': 'ビジョン形成：豊かな未来を描く',
            '智慧交流：啟迪成長思維': '知恵の交流：成長思考を啓発する',
            '♡課程目標與評估♡': '♡コース目標と評価♡',
            '目標': '目標',
            '說明': '説明',
            '覺察自我': '自己認識',
            '透過練習與反思，提升自我認識的深度。': '練習と内省を通して、自己認識の深さを高める。',
            '情緒管理': '感情管理',
            '學習有效的情緒調節技巧，增進內在平靜。': '効果的な感情調節テクニックを学び、内なる平穏を増進する。',
            '目標設定': '目標設定',
            '掌握設定個人成長目標的方法，強化實踐動力。': '個人の成長目標を設定する方法を習得し、実践への動機を強化する。',
            '關係建立': '関係構築',
            '培養健康的溝通模式，促進良好的人際互動。': '健全なコミュニケーションモデルを育成し、良好な対人関係を促進する。',
            '♡聯絡我們♡': '♡お問い合わせ♡',
            '姓名': '名前',
            '您的姓名': 'あなたの名前',
            '電子郵件': 'メールアドレス',
            '您的電子郵件': 'あなたのメールアドレス',
            '訊息': 'メッセージ',
            '您的訊息': 'あなたのメッセージ',
            '送出訊息': 'メッセージを送信',
            '© 2025 蛻變之旅': '© 2025 変革の旅'
        },
        'ko': {
            '♡蛻變之旅': '♡변화의 여정',
            '課程特色': '강좌 특징',
            '聯絡我們': '연락처',
            '關於我們': '회사 소개',
            '聲波共鳴：喚醒內在力量': '음파 공명: 내면의 힘을 깨우다',
            '生命沉思：重塑人生視野': '생명 성찰: 삶의 비전 재정립',
            '願景塑造：描繪豐盛未來': '비전 형성: 풍요로운 미래를 그리다',
            '智慧交流：啟迪成長思維': '지혜 교류: 성장 사고방식 고취',
            '♡課程目標與評估♡': '♡강좌 목표 및 평가♡',
            '目標': '목표',
            '說明': '설명',
            '覺察自我': '자기 인식',
            '透過練習與反思，提升自我認識的深度。': '연습과 성찰을 통해 자기 인식의 깊이를 높입니다.',
            '情緒管理': '감정 관리',
            '學習有效的情緒調節技巧，增進內在平靜。': '효과적인 감정 조절 기술을 배우고 내면의 평화를 증진합니다.',
            '目標設定': '목표 설정',
            '掌握設定個人成長目標的方法，強化實踐動力。': '개인 성장 목표 설정 방법을 익히고 실천 동기를 강화합니다.',
            '關係建立': '관계 형성',
            '培養健康的溝通模式，促進良好的人際互動。': '건강한 의사소통 모델을 개발하여 긍정적인 대인 관계를 촉진합니다.',
            '♡聯絡我們♡': '♡연락처♡',
            '姓名': '이름',
            '您的姓名': '이름을 입력하세요',
            '電子郵件': '이메일',
            '您的電子郵件': '이메일을 입력하세요',
            '訊息': '메시지',
            '您的訊息': '메시지를 입력하세요',
            '送出訊息': '메시지 보내기',
            '© 2025 蛻變之旅': '© 2025 변화의 여정'
        }
    };

    // 頁面載入時，根據瀏覽器語言設定預設語言 (可選)
    const browserLanguage = navigator.language.slice(0, 2);
    if (translations[browserLanguage]) {
        const defaultLanguageLink = languageDropdown.querySelector(`[data-lang="${browserLanguage}"]`);
        if (defaultLanguageLink) {
            currentLanguageSpan.textContent = defaultLanguageLink.textContent;
            translatePage(browserLanguage);
        }
    } else {
        // 預設顯示中文
        translatePage('zh-tw');
    }
});