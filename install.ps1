#npm install hexo-renderer-sass2 --save

#cd theme

#git clone https://github.com/Kevin0z0/hexo-theme-Magral.git
#mv hexo-theme-Magral Migral

#cd ..
$file = ".\_config.yml"
foreach ($line in (get-content $file)){
	if ($line.startswith("theme: ")){
		"theme: Magral" | Set-Content ".\_back.yml"
	}else{
		"$($line)" | Set-Content $file
	}
	
}
