<template>
    <div class="md-col md-col-5 lg-col-4 sidebar">
        <div class="card card--red my3 margin-top0">
            <div class="card__header">
                <h2>Newsletter</h2>
                <img class="header__icon" src="/assets/images/min/icon-newsletter.png">
            </div>
            <div class="card__content">
                <p>Join the weekly newsletter and never miss out on new tips, tutorials, and more.</p>
                <form action="https://laravelnews.createsend.com/t/d/s/owwr/" method="post" class="newsletter-form" data-area="home">
                    <input type="hidden" id="fieldhrcf" name="cm-fd-hrcf-mn" value="3">
                    <input type="hidden" id="fieldhrcfdy" name="cm-fd-hrcf-dy" value="27">
                    <input type="hidden" id="fieldhrcfyr" name="cm-fd-hrcf-yr" value="2018">
                    <div class="input__group">
                        <input class="input__sm" type="email" placeholder="Email Address" name="cm-owwr-owwr" required="">
                        <button class="btn btn--dark-red btn--thin btn--sm newsletter-subscribe">Subscribe</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="card card--gray mb3">
            <header class="card__header">
                <h2>Laravel Jobs</h2>
                <img class="header__icon" src="/assets/images/icon-chair.png">
            </header>
            <div class="card__content">
                <dl class="list-unstyled">
                    <dt><a href="https://larajobs.com/job/1134/" class="link--white" rel="nofollow">Applications Developer</a></dt>
                    <dd>
                        Indianapolis, IN
                        <br>University of Indianapolis
                    </dd>
                    <dt><a href="https://larajobs.com/job/1133/" class="link--white" rel="nofollow">Software Developer</a></dt>
                    <dd>
                        Nashville, TN
                        <br>Bernard Health
                    </dd>
                    <dt><a href="https://larajobs.com/job/1132/" class="link--white" rel="nofollow">Senior Web Application Developer</a></dt>
                    <dd>
                        Remote (Anywhere in the US)
                        <br>Association Web Pros
                    </dd>
                    <dt><a href="https://larajobs.com/job/1131/" class="link--white" rel="nofollow">CTO</a></dt>
                    <dd>
                        Oslo, Norway
                        <br>STK Finans AS
                    </dd>
                    <dt><a href="https://larajobs.com/job/1130/" class="link--white" rel="nofollow">Full Stack PHP Developer (Laravel)</a></dt>
                    <dd>
                        Toronto, Canada
                        <br>Star Dot Hosting Inc
                    </dd>
                    <dt><a href="https://larajobs.com/job/1129/" class="link--white" rel="nofollow">Senior Software Developer</a></dt>
                    <dd>
                        Remote
                        <br>Square1 Software
                    </dd>
                    <dt><a href="https://larajobs.com/job/1128/" class="link--white" rel="nofollow">Laravel Developer (mid level)</a></dt>
                    <dd>
                        Remote (UK or EU based)
                        <br>Mettle
                    </dd>
                </dl>
            </div>
        </div>

        <!-- <div class="card sponsor sponsor--block mb3">
        </div> -->
    </div>
</template>

<style lang="scss" scoped>
    .margin-top0 {
        margin-top: 0;
    }
</style>
