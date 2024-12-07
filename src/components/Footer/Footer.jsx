import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>Acerca de</h4>
                    <p>Somos una plataforma dedicada a promover eventos destacados en Santa Cruz.</p>
                </div>
                <div className="footer-section">
                    <h4>Contacto</h4>
                    <p>Email: info@example.com</p>
                    <p>Teléfono: +591 123 456 789</p>
                    <p>Dirección: Calle Falsa 123, Santa Cruz, Bolivia</p>
                </div>
                <div className="footer-section">
                    <h4>Redes Sociales</h4>
                    <ul>
                        <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Políticas</h4>
                    <ul>
                        <li><a href="/privacy-policy">Política de Privacidad</a></li>
                        <li><a href="/terms-of-service">Términos de Servicio</a></li>
                        <li><a href="/refund-policy">Política de Reembolsos</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Eventos Destacados. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;
