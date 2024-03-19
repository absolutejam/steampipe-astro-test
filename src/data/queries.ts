import { sql } from "./db";

export type CfZone = {
  id: string;
  name: string;
  status: string;
  plan: string;
};

export const cloudflareZones = await sql<CfZone[]>`
SELECT
  id, 
  name,
  status,
  plan->'name' as plan_name
FROM cloudflare.cloudflare_zone
`;

export type KubeNsByTeam = {
  team: string;
  data: {
    name: string;
    annotations: Record<string, string>;
  }[];
};

export const kubernetesNamespacesByTeam = await sql<KubeNsByTeam[]>`
WITH 
  namespaces AS (
    SELECT 
      name, 
      annotations - 'kubectl.kubernetes.io/last-applied-configuration' as annotations
    FROM kubernetes.kubernetes_namespace 
    WHERE annotations->'docs/team' IS NOT null
  )
SELECT 
  annotations->'docs/team' as team,
  json_agg(namespaces.*) as data 
FROM namespaces
GROUP BY annotations->'docs/team'
`;
