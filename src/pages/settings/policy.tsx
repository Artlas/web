import React from "react";

const PolicyPage: React.FC = () => {
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Politiques de confidentialité</h1>
            <div className="mb-4">
                <h2 className="text-lg font-bold mb-2">Collecte des données</h2>
                <p className="text-justify">
                    {
                        "Nous collectons certaines données personnelles dans le but de fournir et d'améliorer notre application. Ces données peuvent inclure des informations telles que votre nom, votre adresse e-mail et votre localisation."
                    }
                </p>
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-bold mb-2">Utilisation des données</h2>
                <p className="text-justify">
                    {
                        "Les données collectées sont utilisées pour personnaliser et améliorer votre expérience avec notre application. Elles peuvent également être utilisées à des fins de communication et de marketing."
                    }
                </p>
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-bold mb-2">Partage des données</h2>
                <p className="text-justify">
                    {
                        "Nous ne partageons pas vos données personnelles avec des tiers sans votre consentement. Cependant, certaines données anonymisées peuvent être utilisées à des fins statistiques ou de recherche."
                    }
                </p>
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-bold mb-2">Sécurité des données</h2>
                <p className="text-justify">
                    {
                        "Nous prenons des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès non autorisé ou toute divulgation. Cependant, veuillez noter qu'aucune méthode de transmission sur Internet ou de stockage électronique n'est totalement sécurisée."
                    }
                </p>
            </div>
        </div>
    );
};

export default PolicyPage;
