# eGoPass Frontend

Cette application est une interface utilisateur pour le système eGoPass, développée avec React et Vite. Elle permet aux utilisateurs de gérer leurs voyages, de scanner des QR codes, et de réinitialiser leurs mots de passe.


## Installation

Pour installer les dépendances du projet, exécutez :

```sh
npm install

Scripts
    npm run dev : Lance le serveur de développement.
    npm run build : Construit le projet pour la production.
    npm run lint : Lint le code source.
    npm run preview : Prévisualise le build de production.

Fonctionnalités
    Authentification
    Login : Permet aux utilisateurs de se connecter.
    Register : Permet aux nouveaux utilisateurs de s'inscrire.
    Forgot Password : Permet aux utilisateurs de réinitialiser leur mot de passe.
    Gestion des voyages
    Add Travel : Permet aux utilisateurs d'ajouter un nouveau voyage.
    Edit Travel : Permet aux utilisateurs de modifier un voyage existant.
    Travel Card : Affiche les détails d'un voyage.
    Gestion des eGoPass
    EGoPass Card : Affiche les détails d'un eGoPass.
    EGoPass Filter : Permet de filtrer les eGoPass.
    Scanning de QR Code
    QrCode Scanner : Permet de scanner des QR codes pour authentifier des eGoPass.
    Profil utilisateur
    Profil : Affiche les informations du profil utilisateur.
    Edit Profil : Permet de modifier les informations du profil utilisateur.

Etat des lieux
    -Un utilisateur à été créé de base et est super admin.
        Ces identifiants sont les suivant:
        nom d'utilisateur: superadmin
        mot de passe: 123456789

    -L'utilisateur super-admin permet de créer des admin en se connectant avec crédentials de super admin et en allant à l'addresse '/login' puis en cliquant sur créer un compte.

    -Les comptes admins ainsi créés son à mesure de créer des Agents.
    *Les comptes ainsi crées sont incomplets, il faudra se connecter et accéder à la section profil, puis édtion de profil pour les compléter.

    -les utilisateurs puvent être créés directment depuis la page de connexion, puis régistration.

Bugs Connues:
    il existe un certain nombre de bugs connus sur lesquels nous travaillons activement. Merci de signaler tous nouveaux bugs rencontrés.

    -La gestion des erreur n'est pas encore effective, nous y travaillons pour bientôt implementer des Toast informatifs et des ErrorBoudary components plus pertinents.

    -Lors du login il arrive que la connexion ait réussi sans que l'utilisaeur ne soit redirigé vers la page d'accueil, sa se produit généralement après un erreur de connexion.
        Il suffit alors de clucker sur le logo de l'application pour être redirigé vers la page d'accuielle. --- Ce bug à été corrigé ---
    
    -La création de voyage par un utilisateur crash parfois pour des raisons de relations innapropriés dans les tables, nous y travaillos et fournissons un utilisateur de test dont les credentials sont les suivantes (avec des voyages déjà crées à des fins de test):
        nom d'utilisateur: ibikivan
        mot de passe: 123456789

    De même qu'un agent pour faire les scans:
        nom d'utilisateur: agent
        mot de passe: 12345678

    Pour le moment seul le systeme de pass gratuit est implémenté.

    -A cause d'un soucis de configuration du proxy d'appach toute autres route que '/' entrée directement dans la bare d'adresse du navigteur tente de contacter directement le backend et avboutis en une ereur 404 (en cours de résolution). --- Ce bug à été corrigé ---

Déployement:
    l'application est déployé sur un Instance Amazon Linux AMI 2023 via un serveur appach
    Les certificats ssl sont autosignés pour des raisons financières et de nom de domaine d'instance propriétaire d'aws. Le message d'avertissement à la connexion est donc normal; veillez cliquer sur Avancer et sélectionner le petit lien en haut.

    l'application est déservie par un API hébergée sur le même serveur et servie par Appach en proxy inversé et donc sous couvert des certificats appach.

    le tout est associé à une base de donnée appach16.


Dépendances
    react : Bibliothèque JavaScript pour construire des interfaces utilisateur.
    react-dom : Fournit des méthodes spécifiques au DOM qui peuvent être utilisées au niveau supérieur de votre application.
    react-query : Gestionnaire de requêtes pour React.
    react-router-dom : Fournit des fonctionnalités de routage pour les applications React.
    framer-motion : Bibliothèque d'animations pour React.
    axios : Client HTTP basé sur les promesses pour le navigateur et node.js.
    bootstrap : Framework CSS pour développer des interfaces web réactives.
    @yudiel/react-qr-scanner : Composant React pour scanner des QR codes.

Configuration ESLint
    Le projet utilise ESLint pour maintenir la qualité du code. La configuration se trouve dans le fichier eslint.config.js.

Configuration Vite
    Le projet utilise Vite comme outil de build. La configuration se trouve dans le fichier vite.config.js.

Contribution
    Les contributions sont les bienvenues. Veuillez ouvrir une issue ou soumettre une pull request pour toute amélioration ou correction de bug.

Licence
    Ce projet est sous licence MIT.