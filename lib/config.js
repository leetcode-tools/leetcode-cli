'use strict';
var _ = require('underscore');
var nconf = require('nconf');

var file = require('./file');

const DEFAULT_CONFIG = {
  // usually you don't wanna change those
  sys: {
    categories: [
      'algorithms',
      'database',
      'shell',
      'concurrency'
    ],
    langs: [
      'bash',
      'c',
      'cpp',
      'csharp',
      'golang',
      'java',
      'javascript',
      'kotlin',
      'mysql',
      'php',
      'python',
      'python3',
      'ruby',
      'rust',
      'scala',
      'swift',
      'typescript'
    ],
    tags: [
      'array',
      'backtracking',
      'binary-indexed-tree',
      'binary-search',
      'binary-search-tree',
      'bit-manipulation',
      'brainteaser',
      'breadth-first-search',
      'depth-first-search',
      'design',
      'divide-and-conquer',
      'dynamic-programming',
      'geometry',
      'graph',
      'greedy',
      'hash-table',
      'heap',
      'line-sweep',
      'linked-list',
      'math',
      'memoization',
      'minimax',
      'ordered-map',
      'queue',
      'random',
      'recursion',
      'rejection-sampling',
      'reservoir-sampling',
      'segment-tree',
      'sliding-window',
      'sort',
      'stack',
      'string',
      'topological-sort',
      'tree',
      'trie',
      'two-pointers',
      'union-find',
      
      // TODO: these two tags below are included on leetcode.com but not on leetcode-cn.com
      // Currently comment out for simplicity

      // 'rolling-hash',
      // 'suffix-array',
    ],
    urls: {
      // base urls
      base:                      'https://leetcode.com',
      graphql:                   'https://leetcode.com/graphql',
      login:                     'https://leetcode.com/accounts/login/',
      // third part login base urls. TODO facebook google
      github_login:              'https://leetcode.com/accounts/github/login/?next=%2F',
      facebook_login:            'https://leetcode.com/accounts/facebook/login/?next=%2F',
      linkedin_login:            'https://leetcode.com/accounts/linkedin_oauth2/login/?next=%2F',
      // redirect urls
      leetcode_redirect:         'https://leetcode.com/',
      github_tf_redirect:        'https://github.com/sessions/two-factor',
      // simulate login urls
      github_login_request:      'https://github.com/login',
      github_session_request:    'https://github.com/session',
      github_tf_session_request: 'https://github.com/sessions/two-factor',
      linkedin_login_request:    'https://www.linkedin.com/login',
      linkedin_session_request:  'https://www.linkedin.com/checkpoint/lg/login-submit',
      // questions urls
      tag:                       'https://leetcode.com/tag/$tag/',
      problems:                  'https://leetcode.com/api/problems/$category/',
      problem:                   'https://leetcode.com/problems/$slug/description/',
      test:                      'https://leetcode.com/problems/$slug/interpret_solution/',
      session:                   'https://leetcode.com/session/',
      submit:                    'https://leetcode.com/problems/$slug/submit/',
      submissions:               'https://leetcode.com/api/submissions/$slug',
      submission:                'https://leetcode.com/submissions/detail/$id/',
      verify:                    'https://leetcode.com/submissions/detail/$id/check/',
      favorites:                 'https://leetcode.com/list/api/questions',
      favorite_delete:           'https://leetcode.com/list/api/questions/$hash/$id',
      plugin:                    'https://raw.githubusercontent.com/leetcode-tools/leetcode-cli/master/lib/plugins/$name.js'
    },
  },

  // but you will want change these
  autologin: {
    enable: false,
    retry:  2
  },
  code: {
    editor: 'vim',
    lang:   'cpp'
  },
  file: {
    show:       '${fid}.${slug}',
    submission: '${fid}.${slug}.${sid}.${ac}'
  },
  color: {
    enable: true,
    theme:  'default'
  },
  icon: {
    theme: ''
  },
  network: {
    concurrency: 10,
    delay:       1
  },
  plugins: {}
};

function Config() {}

Config.prototype.init = function() {
  nconf.file('local', file.configFile())
      .add('global', {type: 'literal', store: DEFAULT_CONFIG})
      .defaults({});

  const cfg = nconf.get();
  nconf.remove('local');
  nconf.remove('global');

  // HACK: remove old style configs
  for (const x in cfg) {
    if (x === x.toUpperCase()) delete cfg[x];
  }
  delete DEFAULT_CONFIG.type;
  delete cfg.type;

  _.extendOwn(this, cfg);
};

Config.prototype.getAll = function(useronly) {
  const cfg = _.extendOwn({}, this);
  if (useronly) delete cfg.sys;
  return cfg;
};

module.exports = new Config();
