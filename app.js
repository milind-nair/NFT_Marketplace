
window.addEventListener('DOMContentLoaded', () => {
    const onboarding = new MetaMaskOnboarding();
    const onboardButton = document.getElementById('connectWallet');
    let accounts;

    const updateButton = async () => {
        if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
            onboardButton.innerText = 'Install MetaMask!';
            onboardButton.onclick = () => {
                onboardButton.innerText = 'Connecting...';
                onboardButton.disabled = true;
                onboarding.startOnboarding();
            };
        } else if (accounts && accounts.length > 0) {
            onboardButton.innerText = `✔ ...${accounts[0].slice(-4)}`;
            onboardButton.disabled = true;
            onboarding.stopOnboarding();
            checkOwner(accounts[0]);
        } else {
            onboardButton.innerText = 'Connect MetaMask!';
            onboardButton.onclick = async () => {
                await window.ethereum.request({
                    method: 'eth_requestAccounts',
                })
                    .then(function (accounts) {
                        onboardButton.innerText = `✔ ...${accounts[0].slice(-4)}`;
                        onboardButton.disabled = true;
                        checkOwner(accounts[0]);
                    });
                };
            }
        };

    updateButton();
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        window.ethereum.on('accountsChanged', (newAccounts) => {
            accounts = newAccounts;
            updateButton();
        });
    }
});

const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function () {
    menu.classList.toggle('is-active')
    menuLinks.classList.toggle('active')
})