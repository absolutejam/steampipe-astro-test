import { App } from "cdk8s";
import { DemoChart } from "./charts/demo";

const app = new App();

export const environments = {
  production: {
    envShort: "prd",
    deploy: { replicas: 5 },
  },
  staging: {
    envShort: "stg",
    deploy: { replicas: 3 },
  },
  development: {
    envShort: "dev",
    deploy: { replicas: 1 },
  },
} as const;

const shared = {
  domain: "crashloopbackoff.dev",
  repoRoot: "gitlab.crashloopbackoff.dev",
};

const teams = ["payments", "data", "delivery"];

for (const team of teams) {
  for (const [env, envConfig] of Object.entries(environments)) {
    const { envShort, deploy } = envConfig;
    const opts = { team, env, envShort, deploy, ...shared };
    new DemoChart(app, { component: "db", ...opts });
    new DemoChart(app, { component: "api", ...opts });
    new DemoChart(app, { component: "report", ...opts });
  }
}

app.synth();
