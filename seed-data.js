const users = [
  {
    first_name: 'Jean',
    last_name: 'Dupont',
    email: 'jean.dupont@example.com',
    created_at: '2024-03-21T18:33:08.818Z',
    updated_at: '2024-03-21T18:33:08.818Z'
  },
  {
    first_name: 'Sophie',
    last_name: 'Martin',
    email: 'sophie.martin@example.com',
    created_at: '2024-03-21T18:33:08.818Z',
    updated_at: '2024-03-21T18:33:08.818Z'
  },
  {
    first_name: 'Luc',
    last_name: 'Leroy',
    email: 'luc.leroy@example.com',
    created_at: '2024-03-21T18:33:08.818Z',
    updated_at: '2024-03-21T18:33:08.818Z'
  },
  {
    first_name: 'Emma',
    last_name: 'Girard',
    email: 'emma.girard@example.com',
    created_at: '2024-03-21T18:33:08.818Z',
    updated_at: '2024-03-21T18:33:08.818Z'
  },
  {
    first_name: 'Alexandre',
    last_name: 'Moreau',
    email: 'alexandre.moreau@example.com',
    created_at: '2024-03-21T18:33:08.818Z',
    updated_at: '2024-03-21T18:33:08.818Z'
  }
]
const tasks = [
  {
    title: "Conception de l'architecture",
    description: "Définir l'architecture globale du système",
    start_date: '2023-06-01T00:00:00.000Z',
    end_date: '2023-06-15T00:00:00.000Z',
    user_id: 1,
    parent_id: null,
    assignee_id: null,
    status: 'todo'
  },
  {
    title: "Développement de l'API REST",
    description: "Implémenter les points d'endpoint de l'API REST",
    start_date: '2023-06-16T00:00:00.000Z',
    end_date: '2023-07-15T00:00:00.000Z',
    user_id: 2,
    parent_id: null,
    assignee_id: null,
    status: 'todo'
  },
  {
    title: 'Conception de la base de données',
    description: 'Concevoir le schéma de la base de données',
    start_date: '2023-06-01T00:00:00.000Z',
    end_date: '2023-06-10T00:00:00.000Z',
    user_id: 3,
    parent_id: null,
    assignee_id: null,
    status: 'in_progress'
  },
  {
    title: 'Implémentation du frontend',
    description: "Développer l'interface utilisateur",
    start_date: '2023-07-01T00:00:00.000Z',
    end_date: '2023-08-15T00:00:00.000Z',
    user_id: 4,
    parent_id: null,
    assignee_id: null,
    status: 'todo'
  },
  {
    title: 'Rédaction de la documentation',
    description: "Documenter l'architecture et les fonctionnalités du système",
    start_date: '2023-08-16T00:00:00.000Z',
    end_date: '2023-09-01T00:00:00.000Z',
    user_id: 5,
    parent_id: null,
    assignee_id: null,
    status: 'todo'
  },
  {
    title: "Mise en place de l'infrastructure",
    description: "Configurer l'environnement de production",
    start_date: '2023-06-15T00:00:00.000Z',
    end_date: '2023-06-30T00:00:00.000Z',
    user_id: 1,
    parent_id: null,
    assignee_id: null,
    status: 'todo'
  },
  {
    title: 'Intégration des services externes',
    description: 'Intégrer les services tiers nécessaires',
    start_date: '2023-07-16T00:00:00.000Z',
    end_date: '2023-08-01T00:00:00.000Z',
    user_id: 2,
    parent_id: null,
    assignee_id: null,
    status: 'todo'
  },
  {
    title: 'Tests unitaires',
    description: 'Écrire et exécuter les tests unitaires',
    start_date: '2023-07-16T00:00:00.000Z',
    end_date: '2023-08-01T00:00:00.000Z',
    user_id: 3,
    parent_id: null,
    assignee_id: null,
    status: 'todo'
  },
  {
    title: 'Déploiement continu',
    description: 'Mettre en place le pipeline de déploiement continu',
    start_date: '2023-08-01T00:00:00.000Z',
    end_date: '2023-08-15T00:00:00.000Z',
    user_id: 4,
    parent_id: null,
    assignee_id: null,
    status: 'todo'
  },
  {
    title: 'Optimisation des performances',
    description: 'Analyser et optimiser les performances du système',
    start_date: '2023-08-16T00:00:00.000Z',
    end_date: '2023-09-01T00:00:00.000Z',
    user_id: 5,
    parent_id: null,
    assignee_id: null,
    status: 'todo'
  },
  {
    title: "Conception de l'expérience utilisateur",
    description: "Concevoir l'expérience utilisateur",
    start_date: '2023-06-15T00:00:00.000Z',
    end_date: '2023-06-30T00:00:00.000Z',
    user_id: 1,
    parent_id: null,
    assignee_id: null,
    status: 'in_progress'
  },
  {
    title: 'Gestion des erreurs et logging',
    description: 'Mettre en place la gestion des erreurs et la journalisation',
    start_date: '2023-08-01T00:00:00.000Z',
    end_date: '2023-08-15T00:00:00.000Z',
    user_id: 2,
    parent_id: null,
    assignee_id: null,
    status: 'todo'
  },
  {
    title: 'Définir les modèles de données',
    description: 'Identifier et définir les modèles de données nécessaires',
    start_date: '2023-06-01T00:00:00.000Z',
    end_date: '2023-06-05T00:00:00.000Z',
    user_id: 3,
    parent_id: 3,
    assignee_id: null,
    status: 'in_progress'
  },
  {
    title: 'Créer les schémas de base de données',
    description: 'Créer les schémas SQL pour la base de données',
    start_date: '2023-06-06T00:00:00.000Z',
    end_date: '2023-06-10T00:00:00.000Z',
    user_id: 3,
    parent_id: 3,
    assignee_id: null,
    status: 'todo'
  },
  {
    title: "Développer l'interface de connexion",
    description: 'Implémenter la page de connexion utilisateur',
    start_date: '2023-07-01T00:00:00.000Z',
    end_date: '2023-07-15T00:00:00.000Z',
    user_id: 4,
    parent_id: 4,
    assignee_id: null,
    status: 'todo'
  },
  {
    title: 'Développer le tableau de bord',
    description: 'Implémenter le tableau de bord utilisateur',
    start_date: '2023-07-16T00:00:00.000Z',
    end_date: '2023-08-01T00:00:00.000Z',
    user_id: 4,
    parent_id: 4,
    assignee_id: null,
    status: 'todo'
  },
  {
    title: 'Définir les personas utilisateurs',
    description: 'Identifier et définir les personas utilisateurs',
    start_date: '2023-06-15T00:00:00.000Z',
    end_date: '2023-06-20T00:00:00.000Z',
    user_id: 1,
    parent_id: 11,
    assignee_id: null,
    status: 'in_progress'
  },
  {
    title: 'Créer les wireframes',
    description:
      'Créer les wireframes pour les principales interfaces utilisateur',
    start_date: '2023-06-21T00:00:00.000Z',
    end_date: '2023-06-30T00:00:00.000Z',
    user_id: 1,
    parent_id: 11,
    assignee_id: null,
    status: 'todo'
  },
  {
    title: 'Implémenter la gestion des exceptions',
    description: "Mettre en place la gestion des exceptions dans l'application",
    start_date: '2023-08-01T00:00:00.000Z',
    end_date: '2023-08-07T00:00:00.000Z',
    user_id: 2,
    parent_id: 12,
    assignee_id: null,
    status: 'todo'
  },
  {
    title: 'Configurer la journalisation',
    description:
      'Configurer le système de journalisation des erreurs et des événements',
    start_date: '2023-08-08T00:00:00.000Z',
    end_date: '2023-08-15T00:00:00.000Z',
    user_id: 2,
    parent_id: 12,
    assignee_id: null,
    status: 'todo'
  }
]

module.exports = {
  users,
  tasks
}
