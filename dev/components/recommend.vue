<template name="box">
    <div class="recommend__body__box radius">
        <div class="recommend__body__box-img cover lazy" data-bg="i.img"></div>
        <div class="recommend__body__box-wrap">
            <div class="clearfix recommend__body__box-tags">

            </div>
            <a href="<%=i.path%>" class="recommend__body__box-title" :title="i.title"><span>{{i.title}}</span></a>
            <div class="recommend__body__box-bottom clearfix">
                <span class="fl">i.date</span>
                <div class="fr recommend__body__box-categories">
                    <a href="item.path">#&nbsp;{{item.name}}</a>
                </div>
            </div>
        </div>
        <div class="recommend__body__box-bg cover lazy" :data-bg="i.img"></div>
    </div>
</template>
