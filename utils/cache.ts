import NodeCache from 'node-cache';

const myCache: any = new NodeCache({ stdTTL: 100, checkperiod: 120 });

export default myCache;