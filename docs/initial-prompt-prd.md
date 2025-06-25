# Initial Prompt PDR

Tu es un product manager/designer. J'ai besoin de toi pour initialiser un PRD pour cursor en anglais. Cela doit etre sous format markdown prêt à être télécharger.

Je souhaite créer une extension chrome appeler "Follow immo". Elle aura pour but d'aider un investisseur dans le suivi/tracking de ses recherches immobilières sur les différents sites d'annonces. L'idée c'est que l'extension soit active sur les sites d'annonces et lorsque l'investisseur est intéressé par un bien, il clique sur le bouton "Follow" inséré dans la page actuelle pour importer l'annonce dans l'extension.
On appellera les annonces suivies les ads.

La data sera pour le moment sera sauvegardée dans le cache du navigateur.
A terme, l'idée est d'avoir une synchronisation de la base d'annonces suivi sur différents source de données externes comme Notion, Airtable, et proposer aussi des templates pour intégrer les annonces dans un document word ou excel.

Les ads auront trois catégorie de champs:
- ceux provenant de l'annonce depuis le site: identifiant unique, nom, surface, prix, typologie, ville, date de publication, date de follow, url de l'annonce, contact de l'agence ou propriétaire, les photos et le DPE
- des champs saisis manuellement comme: prix de location au m2, une note de confiance sur 5, une relation avec une liste pour organiser les annonces
- ceux calculés (formules) comme: rentabilité

L'extension doit avoir techniquement un coeur commun, et des adapteurs par site d'annonces. Les adapteurs permettront:
- d'injecter dans la page de l'annonce du site des composants UI commet le bouton "Follow"
- lors du follow de l'ad, rechercher la data sur la page et dans le cache pour le mapper vers le modèle commun des ads.

L'investisseur pourra interagir avec l'extension de 3 manières différentes:
- En cliquant sur le bouton follow dans la page de l'annonce
- En pouvant visualiser ca liste d'ads followed depuis une iframe fixe sur la droite de la page
- En ayant accès à un back office pour (une page web complète en local) pour gérer toutes ses liste d'ad, les ads, changer les champs, paramétrer l'extension. Ce back-office devra etre accessible dans une future version comme un réel site web et sera embarqué sous forme de web-view dans une app mobile. Le code doit donc être compatible avec les plateformes ciblées. 

Techniquement, le projet doit etre le plus simple possible (pas de DDD etc) et doit utiliser le moins de librairie possible. L'extension étant soumise à validation pour etre publiée sur le store, elle doit etre légère et ultra performante – c'est pilier du projet.
Pour se faire, l'extension doit être en full Typescript, et utiliser la libraire de composants web shadcn. La structure du projet doit etre dans un dossier parent "extension" (car potentiellement il y aura plus tard le dossier backend). Dans le dossier extension on doit retrouver au minimum un dossier src et deux sous-dossiers: core, front-adapters.
Le projet doit respecter la clean architecture, c'est à dire que le dossier core fournira des ports aux front-adapters.
On se concentre dans un premier sur un seul site d'annonce (front adapter) qui est Leboncoin (https://www.leboncoin.fr/). Chaque adapter sera composée de deux parties: l'injection de composants web dans la page et un mapper d'annonce/recherche de data dans la page.
Il n’y a pas de système d’authentification pour le moment