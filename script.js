const buyButtons = document.querySelectorAll('.buy-button');

buyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const product = button.closest('.product');
    const price = product.dataset.price;
    const duration = product.dataset.duration || '';
    alert(`Вы выбрали продукт за ${price} руб. ${duration} Для покупки напишите в Telegram-бота @ValitBuyBot`);
  });
});