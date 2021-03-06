###
# Blog settings
###

# Time.zone = "UTC"

activate :directory_indexes

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  blog.prefix = "blog"

  blog.permalink = "{title}/"
  # Matcher for blog source files
  blog.sources = "{year}-{month}-{day}-{title}.html"
  blog.taglink = "tag/{tag}/"
  # blog.layout = "layout"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length = 250
  blog.year_link = "archive/{year}/"
  blog.month_link = "archive/{year}/{month}/"
  blog.day_link = "archive/{year}/{month}/{day}/"
  # blog.default_extension = ".markdown"

  blog.tag_template = "tag.html"
  blog.calendar_template = "calendar.html"

  # Enable pagination
  blog.paginate = true
  blog.per_page = 10
  blog.page_link = "page/{num}"

  # Categories
  blog.custom_collections = {
    category: {
      link: '/category/{category}/',
      template: 'category.html'
    }
  }
end

page "blog/*", :layout => :post
page "blog/category/*", :layout => :base
page "blog/tag/*", :layout => :base
page "blog/archive/*", :layout => :base
page "blog/feed.xml", layout: false

page "demo/*", :directory_index => false, layout: false

###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", layout: false
#
# With alternative layout
# page "/path/to/file.html", layout: :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# activate :livereload

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'assets/css'

set :js_dir, 'assets/js'

set :fonts_dir, 'assets/fonts'

set :images_dir, 'uploads'


activate :syntax


helpers do
  # Helper method to get a blog post by name
  # From https://forum.middlemanapp.com/t/link-to-article-by-name/1467/6
  def post_url(article_title)
    blog.articles.find { |article| article.title.downcase == article_title.downcase }.url
    rescue
    ""
  end
end


# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
