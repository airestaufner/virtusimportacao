document.addEventListener("DOMContentLoaded", function () {
  const modalOverlay = document.querySelector(".modal-overlay");
  const openModalBtns = document.querySelectorAll(".abrir-modal");
  const closeModalBtn = document.querySelector(".close-modal");
  const quoteForm = document.querySelector("#quote-form");
  let resultado = document.getElementById("resultado");

  // Abrir modal
  openModalBtns.forEach(button => {
    button.addEventListener("click", function () {
        modalOverlay.style.display = "flex";
    });
   });

  // Fechar modal
  closeModalBtn.addEventListener("click", function () {
      modalOverlay.style.display = "none";
      quoteForm.reset();
      document.getElementById("resultado").textContent = "";
  });

  // Fechar modal clicando fora dele
  modalOverlay.addEventListener("click", function (event) {
      if (event.target === modalOverlay) {
          modalOverlay.style.display = "none";
          quoteForm.reset();
          document.getElementById("resultado").textContent = "";
      }
  });

  // Enviar dados para WhatsApp
  quoteForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o recarregamento da página

    // Verifica se o CNPJ tem a classe submit-okay (ou seja, se já foi validado como ativo)
    if (resultado.style.color !== "green") {
        resultado.innerHTML = "⚠️ O CNPJ informado não é válido ou não está ativo! Corrija antes de enviar.";
        resultado.style.color = "red";
        return;
    }

    let name = document.getElementById("name").value.trim();
    let cnpj = document.getElementById("cnpj").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let peca = document.getElementById("peca").value.trim();

    // Se o CNPJ for válido, monta a mensagem para WhatsApp
    const message = `Olá! Gostaria de solicitar um orçamento.%0A%0A*Nome:* ${name}%0A*CNPJ:* ${cnpj}%0A*Email:* ${email}%0A*Telefone:* ${phone}%0A*Peça:* ${peca}`;
    const whatsappUrl = `https://wa.me/5501142000094?text=${message}`;

    // Abre WhatsApp
    window.open(whatsappUrl, "_blank");

    // Fechar modal após envio (se existir)
    if (typeof modalOverlay !== "undefined") {
        modalOverlay.style.display = "none";
    }
 });
});

    let timer;

    document.getElementById("cnpj").addEventListener("input", function () {
        clearTimeout(timer);

        timer = setTimeout(async () => {
            let cnpj = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos
            let resultado = document.getElementById("resultado");

            if (cnpj.length !== 14) {
                resultado.innerHTML = "CNPJ inválido! Digite 14 números.";
                resultado.style.color = "red";
                return;
            }

            try {
                let response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);

                if (!response.ok) {
                    throw new Error("Erro ao consultar o CNPJ");
                }

                let data = await response.json();

                if (data.message) {
                    resultado.innerHTML = "CNPJ não encontrado!";
                    resultado.style.color = "red";
                } else {
                    resultado.innerHTML = `✅ CNPJ válido! Seja Bem-Vindo ${data.razao_social}!`;
                    resultado.style.color = "green";
                }
            } catch (error) {
                resultado.innerHTML = "CNPJ não econtrado. Tente novamente mais tarde!";
                resultado.style.color = "red";
            }
        }, 500);
    });

    var swiper = new Swiper(".review-slider", {
        loop:true,
        spaceBetween: 20,
        autoplay: {
            delay: 8000,
            disableOnInteraction: false,
        },
        centeredSlides: true,
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1020: {
            slidesPerView: 3,
          },
        },
    });


    function showSlide(index) {
        const slides = document.querySelectorAll(".slide");
    
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
    
            // Se for um vídeo, inicia o play
            if (slide.tagName === "VIDEO") {
                i === index ? slide.play() : slide.pause();
            }
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        // Captura todos os elementos que terão o efeito
        const elements = document.querySelectorAll(".animate-in");
    
        // Adiciona a classe 'show' com um atraso gradual
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add("show");
            }, index * 200); // Ajuste o tempo para controlar a velocidade de encaixe
        });
    });

    document.addEventListener("DOMContentLoaded", function () {
        const links = document.querySelectorAll(".navbar a[href^='#']");
        const sections = document.querySelectorAll(".section-animate");
    
        // Função para rolagem acelerada ao clicar na navbar
        links.forEach(link => {
            link.addEventListener("click", function (event) {
                event.preventDefault();
    
                const targetId = this.getAttribute("href");
                const targetSection = document.querySelector(targetId);
    
                if (targetSection) {
                    let targetPosition = targetSection.offsetTop - 50;
                    let startPosition = window.pageYOffset;
                    let distance = targetPosition - startPosition;
                    let duration = 400;
                    let startTime = null;
    
                    function animationScroll(currentTime) {
                        if (startTime === null) startTime = currentTime;
                        let timeElapsed = currentTime - startTime;
                        let progress = Math.min(timeElapsed / duration, 1);
                        let ease = easeOutQuad(progress);
                        window.scrollTo(0, startPosition + (distance * ease));
    
                        if (timeElapsed < duration) {
                            requestAnimationFrame(animationScroll);
                        }
                    }
    
                    function easeOutQuad(t) {
                        return t * (2 - t);
                    }
    
                    requestAnimationFrame(animationScroll);
                }
            });
        });
    
        // Função para ativar a animação ao rolar o mouse
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active"); // Ativa o efeito
                }
            });
        }, { threshold: 0.3 }); // Ativa quando 30% da seção estiver visível
    
        sections.forEach(section => {
            observer.observe(section);
        });
    });
    
    
    
    document.addEventListener("DOMContentLoaded", function () {
        const menuToggle = document.querySelector(".menu-toggle");
        const navbar = document.querySelector(".navbar");
    
        if (menuToggle && navbar) {
            // Abre e fecha o menu ao clicar no botão de toggle
            menuToggle.addEventListener("click", function (event) {
                event.stopPropagation(); // Evita que o clique feche imediatamente o menu
                navbar.classList.toggle("active");
            });
    
            // Fecha o menu ao clicar fora dele
            document.addEventListener("click", function (event) {
                if (!menuToggle.contains(event.target) && !navbar.contains(event.target)) {
                    navbar.classList.remove("active");
                }
            });
    
            // Fecha o menu ao clicar em um link dentro dele
            navbar.querySelectorAll("a").forEach(link => {
                link.addEventListener("click", function () {
                    navbar.classList.remove("active");
                });
            });
        }
    });
    


    document.addEventListener("DOMContentLoaded", function () {
        const whatsappIcon = document.getElementById("whatsapp-icon");
        const whatsappMessage = document.getElementById("whatsapp-message");
    
        // Função para fazer o ícone do WhatsApp dar bounce a cada 3 segundos
        setInterval(() => {
            whatsappIcon.classList.add("bounce");
            setTimeout(() => {
                whatsappIcon.classList.remove("bounce");
            }, 500); // Remove o efeito bounce após 0.5s
        }, 3000); // Repete a cada 3 segundos
    
        // Função para exibir a mensagem a cada 10s e escondê-la após 4s
        function showMessage() {
            whatsappMessage.classList.add("show");
    
            setTimeout(() => {
                whatsappMessage.classList.remove("show");
            }, 4000); // Esconde a mensagem após 4 segundos
        }
    
        // Inicia o loop da mensagem
        showMessage(); // Exibe a mensagem imediatamente ao carregar
        setInterval(showMessage, 12000); // Faz o ciclo da mensagem a cada 10 segundos
    });


    document.addEventListener("DOMContentLoaded", function () {
        const productsSection = document.querySelector(".produtos");
        const productCards = document.querySelectorAll(".produtos .box");
    
        if (!productsSection) return; // Sai da função se a seção não existir
    
        if (window.innerWidth > 1600) { // Aplica o efeito APENAS se for menor que 1600px
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        productCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add("show");
                            }, index * 50); // Aplica um delay entre os cards
                        });
                    }
                });
            }, { threshold: 0.2 }); // Ativa quando 20% da seção estiver visível
    
            observer.observe(productsSection);
        } else {
            // Se for 1600px ou mais, garantir que os produtos fiquem visíveis sem animação
            productCards.forEach(card => card.classList.add("show"));
        }
    });
    

    document.addEventListener("DOMContentLoaded", function () {
        const backToTopButton = document.getElementById("backToTop");
    
        // Mostra o botão quando o usuário rolar para baixo 400px
        window.addEventListener("scroll", function () {
            if (window.scrollY > 400) {
                backToTopButton.classList.add("show");
            } else {
                backToTopButton.classList.remove("show");
            }
        });
    
        // Faz a rolagem suave ao clicar no botão
        backToTopButton.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    });
    


    document.addEventListener("DOMContentLoaded", function () {
        let slides = document.querySelectorAll(".slide");
        let currentIndex = 0;
        let intervalTime = 8000; // 8 segundos
    
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove("active"));
            slides[index].classList.add("active");
        }
    
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }
    
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        }
    
        // Troca automática das imagens
        let slideInterval = setInterval(nextSlide, intervalTime);
    
        // Permite parar o autoplay ao interagir com os botões
        document.querySelector(".prev").addEventListener("click", function () {
            prevSlide();
            resetInterval();
        });
    
        document.querySelector(".next").addEventListener("click", function () {
            nextSlide();
            resetInterval();
        });
    
        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime);
        }
    });
    
    document.addEventListener("DOMContentLoaded", function () {
        const mapaSection = document.querySelector("#mapa");
        const mapaContainer = document.querySelector(".mapa-container");
        const mapaTexto = document.querySelector(".mapa-texto");
    
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        mapaContainer.classList.add("show");
                        mapaTexto.classList.add("show");
                        observer.unobserve(entry.target); // Para não ativar novamente
                    }
                });
            },
            { threshold: 0.3 } // Ativa quando 30% do bloco estiver visível
        );
    
        observer.observe(mapaSection);
    });
    
    
    
    
    
    
    


