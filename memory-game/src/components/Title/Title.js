// Composant Title réutilisable pour les titres principaux
import React from 'react';

function Title({ children, className = '', ...props }) {
    return (
        <h2 className={`main-title ${className}`} {...props}>
            {children}
        </h2>
    );
}

export default Title;
