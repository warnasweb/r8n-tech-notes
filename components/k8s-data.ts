
export type K8sItem = {
  key: string
  title: string
  blurb: string
  details?: string
  icon: string
  snippet?: string
  yaml?: string
  href?: string
}

// Minimal SVG paths encoded as strings to avoid external assets
const icons = {
  pod: "M12 2l8 4v8l-8 4-8-4V6l8-4zm0 2.2L6 6.7v6.6l6 2.5 6-2.5V6.7L12 4.2z",
  node: "M4 4h16v6H4V4zm0 10h7v6H4v-6zm9 0h7v6h-7v-6z",
  cluster: "M12 2l3 5h6l-3 5 3 5h-6l-3 5-3-5H3l3-5-3-5h6l3-5z",
  api: "M4 7h16v2H4V7zm0 4h10v2H4v-2zm0 4h16v2H4v-2z",
  kubelet: "M6 4h12v4H6V4zm0 6h12v10H6V10zm3 3h6v4H9v-4z",
  sched: "M6 3h12v2H6V3zm0 4h12v2H6V7zm0 4h8v2H6v-2zm0 4h12v2H6v-2z",
  etcd: "M12 3l9 5v8l-9 5-9-5V8l9-5zm0 3.2L6 9v6l6 3.3L18 15V9l-6-2.8z",
  ctrl: "M12 3a9 9 0 100 18 9 9 0 000-18zm0 3a6 6 0 110 12 6 6 0 010-12z",
  cli: "M4 6l6 6-6 6 2 2 8-8-8-8-2 2zm12 0h4v12h-4z",
  ns: "M4 5h16v4H4V5zm0 6h10v8H4v-8zm12 0h4v8h-4v-8z",
  deploy: "M12 2v8l4-4-4-4zm6 6l2 2-8 8-4-4-6 6 2 2 4-4 4 4 10-10-2-2z"
} as const

export const k8sItems: K8sItem[] = [
  { key: "pod", title: "Pod", blurb: "Smallest deployable unit that runs one or more containers.", icon: icons.pod },
  { key: "node", title: "Node", blurb: "Worker machine that runs your pods.", icon: icons.node },
  { key: "cluster", title: "Cluster", blurb: "Group of nodes managed as one system.", icon: icons.cluster },
  { key: "api", title: "API Server", blurb: "Front door for all cluster operations.", icon: icons.api },
  { key: "kubelet", title: "Kubelet", blurb: "Agent on each node that keeps pods healthy.", icon: icons.kubelet },
  { key: "sched", title: "Scheduler", blurb: "Decides which node runs each pod.", icon: icons.sched },
  { key: "etcd", title: "etcd", blurb: "Distributed key‑value store for all cluster data.", icon: icons.etcd },
  { key: "ctrl", title: "Controller Manager", blurb: "Reconciles desired vs actual cluster state.", icon: icons.ctrl },
  { key: "kubectl", title: "kubectl", blurb: "CLI tool to talk to your cluster.", icon: icons.cli },
  { key: "ns", title: "Namespace", blurb: "Logical boundary to isolate resources.", icon: icons.ns },
  { key: "deploy", title: "Deployment", blurb: "Automatically manages creating & updating pods.", icon: icons.deploy },

].map(i => {
  // Attach sample details/snippets
  const samples: Record<string, {details:string, snippet:string}> = {
    pod: { details: "Pods encapsulate one or more tightly coupled containers, storage, and a network identity.", snippet: "kubectl get pods\nkubectl describe pod <name>" },
    node: { details: "Nodes are worker machines (VM or physical) with kubelet & container runtime.", snippet: "kubectl get nodes\nkubectl describe node <node-name>" },
    cluster: { details: "A cluster is the set of nodes plus the control plane components.", snippet: "kubectl cluster-info" },
    api: { details: "The API server validates and configures data for the API objects.", snippet: "kubectl api-resources\nkubectl get --raw '/' | jq '.'" },
    kubelet: { details: "Kubelet ensures containers are running in a pod on a node.", snippet: "kubectl logs <pod> -c <container>" },
    sched: { details: "Scheduler watches for newly created pods with no assigned node and assigns one.", snippet: "kubectl get events --sort-by=.lastTimestamp" },
    etcd: { details: "etcd stores the cluster state and configuration as a distributed key/value store.", snippet: "# etcd is not managed via kubectl; admin tooling/backup is used" },
    ctrl: { details: "Controller manager runs controllers to reconcile desired and current state.", snippet: "kubectl get deployments --all-namespaces" },
    kubectl: { details: "kubectl is the CLI used by operators and CI/CD to talk to the API server.", snippet: "kubectl get all -A" },
    ns: { details: "Namespaces partition cluster resources among multiple users or projects.", snippet: "kubectl get ns\nkubectl create ns demo" },
    deploy: { details: "Deployments manage ReplicaSets to keep a desired number of pods alive.", snippet: "kubectl create deploy web --image=nginx\nkubectl rollout status deploy/web" },
  }
  const s = samples[i.key as keyof typeof samples]
  return { ...i, details: s?.details, snippet: s?.snippet }
})


export const yamlSamples: Record<string, string> = {
  pod: `apiVersion: v1
kind: Pod
metadata:
  name: hello-pod
spec:
  containers:
  - name: web
    image: nginx:1.25`,
  deploy: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-deploy
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web
        image: nginx:1.25`,
  ns: `apiVersion: v1
kind: Namespace
metadata:
  name: demo`,
  node: `# Nodes are created by the platform/cluster, not via YAML in most cases.`,
  api: `# API server config is managed by the control plane, not via app YAML.`,
  etcd: `# etcd is managed outside kubectl; backup/restore via admin tooling.`,
  sched: `# Scheduler settings are control-plane level.`,
  ctrl: `# Controller manager settings are control-plane level.`,
  kubectl: `# kubectl is a CLI, not defined via YAML.`,
  cluster: `# A "Cluster" isn't created via a single YAML file; it's provisioned by tooling.`,
}

export function getItemByKey(key: string): K8sItem | undefined {
  const found = k8sItems.find(i => i.key === key)
  if (!found) return undefined
  return { ...found, yaml: yamlSamples[key] }
}
