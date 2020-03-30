---
title: How to Remove Certain Tags from a Shopify Collections Filter
date: "2020-03-30"
description: "Hide specific product tags on a Shopify collections page using liquid"
---

## The Problem

I run a [Shopify store that sells outdoor furniture](https://monarchpatio.com).

I use tags on my Shopify store to make unique collections. For example, I have some products that are part of a _Heritage_ collection or others that are part of a _Classic_ collection. I could make those collections work by using the _Type_ option, but I have the _Type_ classifer being used to identify things like _Chairs_, _Swings_, etc.

I also use Shopify tags to make some things work on my store's back end. For example, I use the app _Infinite Options_ to add customization features for some of my products. I have some products that need the ability to choose two colors. Other products need the option to customize cushion colors, so I have a different tag for that. Infinite Options looks for these tags and applies the app to only the relevant products.

The problem is that these tags were showing up in the _Browse By_ filter on my collections pages. I didn't want my customers to be able to see these filter options because it looked unprofessional. I couldn't just delete the tags because it would break functionality on my website.

![Collections Page with Extra Options](/collections-page-with-extra-tags.png)

<!-- ![Extra Tags in Browse By Option](/with-extra-tags.png) -->

You can remove these fairly easily with 2 lines of Liquid. For reference, I am using the _Minimal_ theme by Shopify on my website.

## How to Hide Tags from Collection Filters

First, [go into your store's code base](/how-to-access-shopify-store-code/).

From there, you'll want to find the .liquid file that controls the filter. It is probably in the _Snippets_ folder. With the _Minimal_ theme, it is called `collection-tags.liquid`.

You should see something like this in that file:

```liquid{22-25}
{%- if collection.all_tags.size > 0 -%}
  <div class="form-horizontal">
    <label for="BrowseBy">{{ 'collections.sorting.browse' | t }}</label>
    {% comment %}Good for /collections/all collection and regular collections{% endcomment %}
    {%- if collection.handle -%}
      {%- capture collection_url -%}
        {%- if collection.url == blank -%}
          {{ routes.all_products_collection_url }}{%- unless collection.sort_by == blank -%}?sort_by={{ collection.sort_by }}{%- endunless -%}
        {%- else -%}
          {{ collection.url }}{%- unless collection.sort_by == blank -%}?sort_by={{ collection.sort_by }}{%- endunless -%}
        {%- endif -%}
      {%- endcapture -%}
    {% comment %}Good for automatic type collections{% endcomment %}
    {%- elsif collection.current_type -%}
      {% assign collection_url = collection.current_type | url_for_type | sort_by: collection.sort_by  %}
    {% comment %}Good for automatic vendor collections{% endcomment %}
    {%- elsif collection.current_vendor -%}
      {% assign collection_url = collection.current_vendor | url_for_vendor | sort_by: collection.sort_by %}
    {%- endif -%}
    <select name="BrowseBy" id="BrowseBy" class="btn--tertiary">
      <option value="{{ collection_url }}">{{ 'collections.sorting.all_tags' | t }}</option>
      {%- for tag in collection.all_tags -%}
        {% capture new_url %}{{ tag | link_to_tag: tag | split: 'href="' | last | split: '"' | first }}{% endcapture %}
        <option{% if current_tags contains tag %} selected{% endif %} value="{{ new_url }}">{{ tag }}</option>
      {%- endfor -%}
    </select>
  </div>
{%- endif -%}
```

You can see that Shopify is fetching all of our tags and rendering them in the browser as an option in these lines of the above code:

```liquid
{%- for tag in collection.all_tags -%}
    {% capture new_url %}{{ tag | link_to_tag: tag | split: 'href="' | last | split: '"' | first }}{% endcapture %}
    <option{% if current_tags contains tag %} selected{% endif %} value="{{ new_url }}">{{ tag }}</option>
{%- endfor -%}
```

Now, the two tags we want to filter out are 'NeedsCushion' and 'WR Dual Tone'. Just replace these tags with the ones you want to filter out on your store.

You'll want to find the `<option/>` that's created by the Liquid code in this block.

Once we find where Shopify is creating our option values, we can intercept the ones we don't want and filter them out.

Here's what we'll add to filter those out:

```liquid
{% if tag != 'NeedsCushion' and tag != 'WR Dual Tone' %}
{% endif %}
```

**Here's the final result:**

```liquid{2,5}
{%- for tag in collection.all_tags -%}
    {% if tag != 'NeedsCushion' and tag != 'WR Dual Tone' %}
        {% capture new_url %}{{ tag | link_to_tag: tag | split: 'href="' | last | split: '"' | first }}{% endcapture %}
        <option{% if current_tags contains tag %} selected{% endif %} value="{{ new_url }}">{{ tag }}</option>
    {% endif %}
{%- endfor -%}
```

This should filter out specific tags for your customers and still allow you to use them on the back end of your store.

![Tags Filtered Out in Browse By Option](/tags-filtered-out.png)

Any questions? Let me know at daniel.schlabach3 [at] gmail [dot] com.
