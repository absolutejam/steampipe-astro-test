# astro-steampipe

## Usage

  - Run steampipe in service mode:

    ```bash
    task steampipe:service:start
    ```

  - Spin up k3d cluster:

    ```bash
    task infra:cluster:up
    ```

  - Build & deploy manifests to test cluster:

    ```bash
    task infra:manifests:build
    task infra:manifests:deploy
    ```

  - Run astro:

    ```bash
    bun dev
    ```



