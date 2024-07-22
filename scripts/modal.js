document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal__body');
    const closeButton = document.querySelector('.modal__close-button');

    const images = ['_DSF8262.jpg', '_DSF8265.jpg', '_DSF8275.jpg'];
    const videos = {
        video1: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        video2: 'https://www.youtube.com/embed/3JZ_D3ELwOQ'
    };

    document.querySelectorAll('.open-modal').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.id;
            const videoId = this.dataset.video;

            modalContent.innerHTML = '';

            if (id === 'image') {
                createImageGallery(images);
            } else if (id === 'video' && videoId) {
                createVideo(videos[videoId]);
            } else if (id === 'consultation') {
                createPost()
            }

            openModal();
        });
    });

    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    function openModal() {
        modal.classList.add('open');
    }

    function closeModal() {
        modal.classList.remove('open');
    }

    function createImageGallery(images) {
        const gallery = document.createElement('div');
        gallery.className = 'gallery';

        const prevButton = document.createElement('button');
        prevButton.className = 'prev';
        prevButton.innerText = '<';

        const nextButton = document.createElement('button');
        nextButton.className = 'next';
        nextButton.innerText = '>';

        images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = `res/${src}`;
            img.alt = src;
            if (index === 0) img.classList.add('active');
            gallery.appendChild(img);
        });

        gallery.appendChild(prevButton);
        gallery.appendChild(nextButton);
        modalContent.appendChild(gallery);

        let currentIndex = 0;

        function showImage(index) {
            const imgs = gallery.querySelectorAll('img');
            imgs[currentIndex].classList.remove('active');

            currentIndex = (index + imgs.length) % imgs.length;

            imgs[currentIndex].classList.add('active');
        }

        prevButton.addEventListener('click', function() {
            showImage(currentIndex - 1);
        });

        nextButton.addEventListener('click', function() {
            showImage(currentIndex + 1);
        });
    }

    function createVideo(videoUrl) {
        const iframe = document.createElement('iframe');
        iframe.src = videoUrl;
        iframe.width = '100%';
        iframe.height = '400px';
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;

        modalContent.appendChild(iframe);
    }

    function createPost() {
        const container = document.createElement('div');
        container.className = 'form__container';
        modalContent.style.display = 'flex';
        modalContent.style.justifyContent = 'center';

        const title = document.createElement('h2');
        title.className = 'form-title';
        title.textContent = 'Консультация трёх врачей, бесплатный план лечения и точная стоимость сразу!';

        const desc = document.createElement('p');
        desc.className = 'form-desc';
        desc.textContent = 'Оставьте свои контакты, чтобы получить всё это бесплатно';

        const form = document.createElement('form');

        const nameGroup = document.createElement('div');
        nameGroup.className = 'form-group';

        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Ваше имя';
        nameGroup.appendChild(nameLabel);

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.name = 'name';
        nameInput.placeholder = 'Введите ваше имя';
        nameGroup.appendChild(nameInput);

        const phoneGroup = document.createElement('div');
        phoneGroup.className = 'form-group';

        const phoneLabel = document.createElement('label');
        phoneLabel.textContent = 'Телефон';
        phoneGroup.appendChild(phoneLabel);

        const phoneInput = document.createElement('input');
        phoneInput.type = 'tel';
        phoneInput.name = 'phone';
        phoneInput.value = '+7';
        phoneInput.maxLength = 12;
        phoneGroup.appendChild(phoneInput);

        phoneInput.addEventListener('input', function(e) {
            let cursorPosition = this.selectionStart;
            let value = this.value;
            let newValue = '+7';

            // Удаляем все нецифровые символы после "+7"
            value = value.replace(/\D/g, '');

            // Добавляем цифры после "+7"
            if (value.length > 1) {
                newValue += value.substring(1, 11);
            }

            // Устанавливаем новое значение
            this.value = newValue;

            // Корректируем позицию курсора
            cursorPosition = Math.max(2, Math.min(cursorPosition, newValue.length));
            this.setSelectionRange(cursorPosition, cursorPosition);
        });

        const submitButtonGroup = document.createElement('div');
        submitButtonGroup.className = 'form-group';

        const submitButton = document.createElement('button');
        submitButton.className = 'submit__button';
        submitButton.type = 'submit';
        submitButton.textContent = 'Получить бесплатно';
        submitButtonGroup.appendChild(submitButton);

        const politic = document.createElement('p');
        politic.className = 'form-politic';
        politic.textContent = 'Нажимая кнопку "Получить бесплатно" вы соглашаетесь с политикой конфиденциальности';

        form.appendChild(nameGroup);
        form.appendChild(phoneGroup);
        form.appendChild(submitButtonGroup);

        container.appendChild(title);
        container.appendChild(desc);
        container.appendChild(form);
        container.appendChild(politic);

        modalContent.appendChild(container);

    }
});