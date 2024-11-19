# BUILD OPTIMISATION - iOS

- [Overview](#overview)
- [Discussion](#discussion)
- [Ccache](#ccache)
  - [Ccache on Local](#ccache-on-local)
  - [Ccache on CI](#ccache-on-ci)
  - [Benchmarks for ccache](#benchmarks-for-ccache)
    - [Without Additional Dependencies](#without-additional-dependencies)
    - [With Additional Dependencies](#with-additional-dependencies)
- [Build cache](#build-cache)
  - [Build Cache on Local](#build-cache-on-local)
  - [Build Cache on CI](#build-cache-on-ci)
  - [Benchmarks for build-cache](#benchmarks-for-build-cache)
    - [Without Additional Dependencies](#without-additional-dependencies-build-cache)
    - [With Additional Dependencies](#with-additional-dependencies-build-cache)
- [Observations](#observations)
- [Note](#note)

## **_Overview_**

Build optimization is an important part of iOS development that may help developers minimise build times, enhance productivity, and helps in resource utilization on pipeline. For catalyst project ,we have tried [ccache](https://ccache.dev/ 'ccache') and [build-cache]((https://github.com/mbitsnbites/buildcache 'build-cache') to improve the build process for iOS applications.

## **_Discussion_**

We have tried couple of things to reduce time for iOS build Pipeline.

- Earlier it was taking **~1.2hours**
  - Release build for ipa - _25 mins_ - can be run only on real device.
  - Release build for .app - _30 mins_ - can be run on simulators.

After discussing with community people(s) and implementing some stuffs to catalyst repo,

- Optionally building .ipa or .app as per the need (this reduce time to half).
- Targeting build for specific platform - no major affect on build time.
- Using/caching common dependencies across .ipa and .app builds (in same/single workflow run) - couldn’t find a way to do so.
- Ccache or build cache - **50% - 60%** optimisation.
  - ⚠️ As mentioned in the [react native docs](https://reactnative.dev/docs/0.69/build-speed#using-this-approach-on-a-ci 'react native docs') that in CI it is recommended to do the full clean build. But if we are keen on reducing the build time for iOS build then we could try below mentioned methods.

## **_Ccache_**

Ccache works by wrapping the C++ compilers, storing the compilation results, and skipping the compilation if an intermediate compilation result was originally stored.

When you run a build with ccache, the following happens:

- The build system checks if there is a cached version of the compilation output for the given source files. If there is a cache hit, ccache returns the cached output and the build process can skip the compilation step.

- If there is no cached output available, the build system proceeds with the compilation as usual. The resulting output is then stored in the cache directory for future use.

- The next time the same source files are compiled, the build system will check the cache first. If there is a cache hit, ccache returns the cached output, which saves time and reduces the build time.

### **Setup**

#### **Ccache on Local**

Follow the steps mentioned in the react native document for the [ccache setup](https://reactnative.dev/docs/0.69/build-speed#use-a-compiler-cache 'ccache setup')
and regarding the xcode specific configuration follow the steps below:

<div id="post-install"></div>

Open your project's Podfile which is located inside `ios/Podfile` and add the following steps in the post_install method.

```
post_install do |installer|
    react_native_post_install(installer)

    # ...possibly other post_install items here

    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        # Using the un-qualified names means you can swap in different implementations, for example ccache
        config.build_settings["CC"] = "clang"
        config.build_settings["LD"] = "clang"
        config.build_settings["CXX"] = "clang++"
        config.build_settings["LDPLUSPLUS"] = "clang++"
      end
    end

    __apply_Xcode_12_5_M1_post_install_workaround(installer)
  end
```

After this do the below configuration :

```
export CCACHE_SLOPPINESS=clang_index_store,file_stat_matches,include_file_ctime,include_file_mtime,ivfsoverlay,pch_defines,modules,system_headers,time_macros
export CCACHE_FILECLONE=true
export CCACHE_DEPEND=true
export CCACHE_INODECACHE=true
```

#### **Ccache on CI**

The steps are mentioned in the [document](https://github.com/Chocobo1/setup-ccache-action#readme 'document') for setting up ccache in pipeline.
This action provides a few flags for customizing the behavior and are mentioned in the [action.yml](https://github.com/Chocobo1/setup-ccache-action/blob/master/action.yml 'action.yml') file.
For the Current Project Setup we need the use of `ccache_options ` flag and the options to be mentioned are listed below:

```
            max_size=3.0G
            compression=false
            compiler_check=content
            sloppiness=clang_index_store,file_stat_matches,include_file_ctime,include_file_mtime
            ivfsoverlay,pch_defines,modules,system_headers,time_macros
            depend_mode=true
            file_clone=true
            inode_cache=true

```

And also inside `ios/Podfile` add the steps mentioned in the [above](#post-install) section.

To know more about the configuration options click [here](https://ccache.dev/manual/latest.html#_configuration_options 'here').

#### **Benchmarks for ccache**

##### _Without Additional Dependencies_

|                | In Local | In Pipeline |
| -------------- | -------- | ----------- |
| Without ccache | ~2 mins  | ~20 mins    |
| With ccache    | ~40 secs | ~5 mins     |

##### _With Additional Dependencies (ccache will do compilation again for newly added dependencies )_

|                | In Local | In Pipeline |
| -------------- | -------- | ----------- |
| Without ccache | ~4 mins  | ~23 mins    |
| With ccache    | ~2 mins  | ~12 mins    |

## **_Build cache_**

Build Cache is an advanced compiler accelerator that caches and reuses build results to avoid unnecessary re-compilations, and thereby speeding up the build process. It works by analyzing your source code and build artifacts and storing the results in a cache directory. The next time you build your app, the cache is checked to see if any of the files have changed since the last build. If the files haven't changed, then the build process can skip the steps that are not necessary, such as compiling or packaging files, resulting in a faster build.

### **Setup**

#### **Build Cache on Local**

Follow the steps mentioned in the [document](https://zanechua.com/blog/reduce-react-native-xcode-build-time 'document') for configuring the setup for build-cache local.

#### **Build Cache on CI**

Follow the steps mentioned in the [document](https://github.com/mikehardy/buildcache-action#readme 'document') for the setup of buildcache on pipeline.

#### **Benchmarks for build-cache**

<div id="without-additional-dependencies-build-cache"></div>

##### _Without Additional Dependencies_

|                     | In Local | In Pipeline |
| ------------------- | -------- | ----------- |
| Without build cache | ~2 mins  | ~30 mins    |
| With build cache    | ~30 secs | ~14 mins    |

<div id="with-additional-dependencies-build-cache"></div>

##### _With Additional Dependencies (build-cache will do build phase as new dependencies gets added )_

|                     | In Local | In Pipeline |
| ------------------- | -------- | ----------- |
| Without build cache | ~4 mins  | ~40 mins    |
| With build cache    | ~50 secs | ~12 mins    |

## **_Observations_**

iOS build time gets reduction of approximately _40-50%_ may be expected when using the above mentioned techniques.

For the catalyst project,

- macos-latest, **branch - dev** , using **ccache** : ~10mins (vs ~25mins)
- macos-latest, **branch - dev** , using **build-cache** : ~13mins (vs ~25mins)
- macos-latest, **branch - ux** , using **ccache** : ~7mins (vs ~27mins)
- macos-latest, **branch - ux** , using **build-cache** : ~12mins (vs ~27mins)

## **_Note_**

> The above mentioned benchmarks for [ccache](#benchmarks-for-ccache) and [build-cache](#benchmarks-for-build-cache) are done with the **sample template of react-native app **.

> Cache creation for .ipa and .app will not share the same cache file, ccache/build-cache creates a seperate cache for each as their build configuration gets varies.
