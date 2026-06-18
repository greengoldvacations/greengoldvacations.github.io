source "https://rubygems.org"

# Ruby >= 3.4 removed these from stdlib
gem "csv"
gem "base64"
gem "bigdecimal"

# Jekyll 4.x – compatible with Ruby 3.2+
gem "jekyll", "~> 4.3"
gem "liquid", ">= 4.0.4"   # 4.0.3 used String#tainted?, removed in Ruby 3.2
gem "webrick"               # required for Ruby >= 3.0

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
end
