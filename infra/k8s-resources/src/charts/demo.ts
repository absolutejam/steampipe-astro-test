import { Construct } from "constructs";
import { Chart, ChartProps } from "cdk8s";
import { KubeNamespace, KubeDeployment } from "../../imports/k8s";
import { ImagePullPolicy } from "cdk8s-plus-25";

export type DemoChartProps = {
  env: string;
  envShort: string;
  team: string;
  component: string;
  domain: string;
  repoRoot: string;
  deploy: DeployProps;
} & ChartProps;

export type DeployProps = {
  replicas: number;
};

export class DemoChart extends Chart {
  public kubeNamespace: KubeNamespace;
  public kubeDeployment: KubeDeployment;

  constructor(scope: Construct, props: DemoChartProps) {
    const { env, envShort, team, component, domain, repoRoot, deploy } = props;
    const namespace = `${envShort}-${team}-${component}`;

    super(scope, namespace);

    const labels = {
      environment: env,
      "environment-short": envShort,
      component,
      team,
    };
    const annotations = {
      "docs/team": team,
      "docs/component": component,
      "docs/email": `${team}-team@${domain}`,
      "docs/repo": `${repoRoot}/${team}/${component}`,
    };

    this.kubeNamespace = new KubeNamespace(this, `${env}-namespace`, {
      metadata: {
        name: namespace,
        labels,
        annotations,
      },
    });

    const deployLabels = {
      ...labels,
      app: "postgres",
    };
    this.kubeDeployment = new KubeDeployment(this, `${env}-deployment`, {
      metadata: {
        namespace,
        labels: {},
        annotations,
      },
      spec: {
        replicas: deploy.replicas,
        selector: {
          matchLabels: deployLabels,
        },
        template: {
          metadata: {
            labels: deployLabels,
          },
          spec: {
            containers: [
              {
                name: "dummy",
                image: "nginx:latest",
                imagePullPolicy: ImagePullPolicy.IF_NOT_PRESENT,
              },
            ],
          },
        },
      },
    });
    this.kubeDeployment.addDependency(this.kubeNamespace);
  }
}
