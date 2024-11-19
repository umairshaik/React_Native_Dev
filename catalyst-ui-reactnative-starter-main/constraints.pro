gen_enforced_dependency(WorkspaceCwd, 'jest', '29.1.1', devDependencies) :-
  workspace_has_dependency(WorkspaceCwd, 'jest', _, devDependencies).
gen_enforced_dependency(WorkspaceCwd, 'eslint', '8.17.0', devDependencies) :-
  workspace_field(WorkspaceCwd, 'version', _),
  workspace_has_dependency(WorkspaceCwd, 'eslint', _, devDependencies).
