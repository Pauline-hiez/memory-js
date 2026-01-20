// Composant Button générique et réutilisable
import React from 'react';

function Button({ children, onClick, type = 'button', className = '', ...props }) {
    return (
        <button type={type} className={`btn ${className}`} onClick={onClick} {...props}>
            {children}
        </button>
    );
}

export default Button;
